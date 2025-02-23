import { getBackendUrlFromStore } from "shared/store/setting";

import type { DownloadMessage } from "../types";

const eventSources: Record<string, EventSource> = {};
const instantiateEventSource = (backendUrl: string, serviceId: string) => {
  if (eventSources[serviceId]) {
    return eventSources[serviceId];
  } else {
    eventSources[serviceId] = new EventSource(
      `${backendUrl}v1/download-service-stream-sse/${serviceId}`,
    );
  }
};

const downloadServiceStream = async (
  serviceId: string,
  onError: (err: any) => void,
  onMessage: (message: DownloadMessage) => void,
  onceCompleted: () => void,
): Promise<void> => {
  const backendUrl = new URL(getBackendUrlFromStore());
  try {
    instantiateEventSource(backendUrl.toString(), serviceId);
    eventSources[serviceId].onmessage = (event) => {
      if (!event.data) return;
      const parsedData = JSON.parse(event.data);
      const status = parsedData.status;
      if (status === "Download complete") {
        eventSources[serviceId].close();
        onceCompleted();
        return;
      }
      onMessage(parsedData);
    };
    eventSources[serviceId].onerror = (err: any) => {
      eventSources[serviceId].close();
      onError(err);
    };
    eventSources[serviceId].onopen = (evt) => {
      console.log("onopen", evt);
    };
  } catch (err) {
    console.log(err);
    onError(err);
  }
};

export default downloadServiceStream;
