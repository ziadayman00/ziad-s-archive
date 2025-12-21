import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { valid: false, error: 'No token provided' },
        { status: 401 }
      );
    }

    const decoded = Buffer.from(token, 'base64').toString();
    const [email] = decoded.split(':');

    if (email === process.env.ADMIN_EMAIL) {
      return NextResponse.json({
        valid: true,
        user: { email },
      });
    }

    return NextResponse.json(
      { valid: false, error: 'Invalid token' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { valid: false, error: 'Token verification failed' },
      { status: 500 }
    );
  }
}