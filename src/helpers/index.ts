export const generateResponse = (
  statusCode: number = 500,
  message: string = "Internal Server Error",
  addtionalData: object = {}
) => {
  return {
    status: statusCode,
    message,
    ...addtionalData,
  };
};

export interface DefaultReponseBody {
  status: number;
  message: string;
}
