import * as z from "zod";

export const authSchema = z.object({
  username: z.string().min(1),
  Pw: z.string().min(8),
});
