import { uniqueId } from "lodash";
import ExecutionMetaData from "./utils/ExecutionMetaData";
import type { TDefaultMessage } from "utils/MessageUtil";
import { dataTreeEvaluator } from "../handlers/evalTree";

let windowMessageListener: ((e: MessageEvent<any>) => void) | null = null;

function windowMessageFnDescriptor(
  this: any,
  origin: string,
  onSuccessCallback?: (...args: any) => any,
) {
  return {
    type: "WINDOW_MESSAGE" as const,
    payload: {
      listenerId: this.listenerId,
      data: this.data,
    },
  };
}

export type TWatchWindowMessageArgs = Parameters<
  typeof windowMessageFnDescriptor
>;
export type TWindowMessageDescription = ReturnType<
  typeof windowMessageFnDescriptor
>;
export type TWindowMessageActionType = TWindowMessageDescription["type"];

export function windowMessage(...args: TWatchWindowMessageArgs) {
  const metaData = ExecutionMetaData.getExecutionMetaData();
  const [origin, onSuccessCallback] = args;

  const listenerId = uniqueId("windowMessageListener_");

  const messageHandler = (event: MessageEvent<TDefaultMessage<any>>) => {
    const message = event.data;
    const origin1 = event.data.body.origin;

    if (origin !== origin1) return;

    if (message.messageId !== listenerId) return;

    ExecutionMetaData.setExecutionMetaData(metaData);
    const { body } = message;

    if (!dataTreeEvaluator) throw new Error("No data tree evaluator found");

    ExecutionMetaData.setExecutionMetaData(metaData);
    self["$isDataField"] = false;

    if (body.data) {
      console.log(onSuccessCallback);
      if (typeof onSuccessCallback === "function") onSuccessCallback(body.data);
    } else if (body.error) {
      // TODO add error alert message
      // if (typeof onErrorCallback === "function") onErrorCallback(body.error);

      self.removeEventListener("message", messageHandler);
      windowMessageListener = null;
    }
  };

  self.addEventListener("message", messageHandler);
  windowMessageListener = messageHandler;
}
