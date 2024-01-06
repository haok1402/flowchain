export type Response = {
  text: string;
}

export type Request = {
};

export type NodeData = {
  label: string;
  status: "Editing" | "Running" | "Completed" | "Failed";
  request: Request;
  response: Response;
}
