import "next-auth";

type UserId = string;

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
    lastName: string;
    emailVerified: boolean;
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: UserId;
      lastName: string;
      emailVerified: boolean;
    };
  }
}
