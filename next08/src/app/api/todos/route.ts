import { NextResponse } from "next/server";

const DATA_SOURCE_URL = "https://jsonplaceholder.typicode.com/todos";
const API_KEY: string = process.env.DATA_API_KEY as string;

export async function GET() {
  const res = await fetch(DATA_SOURCE_URL);

  const todos: Todo[] = await res.json();

  return NextResponse.json(todos);
}

export async function POST(request: Request) {
  const { title, userId }: Partial<Todo> = await request.json();
  if (!title || !userId) {
    return NextResponse.json(
      {
        message: "Missing info",
      },
      {
        status: 400,
      }
    );
  }
  const res = await fetch(DATA_SOURCE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "API-Key": API_KEY,
    },
    body: JSON.stringify({
      title,
      userId,
      completed: false,
    }),
  });

  const createdTodo = (await res.json()) as Todo;

  return NextResponse.json({
    message: `Todo ${createdTodo.id} created`,
    todo: createdTodo,
  });
}
