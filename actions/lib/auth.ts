import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function getUserIdFromToken(): Promise<number | null> {
  const token = cookies().get("token")?.value;
  if (!token) {
    return null;
  }
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as unknown as {
      userId: number;
    };
    return decoded.userId;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
}
