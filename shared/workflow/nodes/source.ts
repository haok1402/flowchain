type WebsiteRequest = {
  type: "website";
  payload: {
    url: string;
  }
}

type DocumentRequest = {
  type: "document";
  payload: {
    ref: string;
  }
}

export type Request = WebsiteRequest | DocumentRequest;

export type Response = {
  text: string;
}

export type NodeData = {
  label: string;
  status: "editing" | "running" | "success" | "failure";
  request: Request;
  response: Response;
}
