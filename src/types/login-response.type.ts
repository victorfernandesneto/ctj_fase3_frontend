export type LoginResponse = {
    message: string;
    data: {
      session: {
        access_token: string;
        refresh_token: string;
        user: { id: string;
      };
    };
}}