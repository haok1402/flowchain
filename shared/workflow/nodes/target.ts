export type Response = {
  text: string;
}

export type Request = {
};

export type NodeData = {
  label: string;
  status: "editing" | "running" | "success" | "failure";
  request: Request;
  response: Response;
}
