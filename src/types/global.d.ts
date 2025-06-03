// src/types/global.d.ts

interface Window {
  google: {
    
    accounts: {
      id: {
        initialize: (options: {
          client_id: string;
          callback: (response: { credential: string }) => void;
        }) => void;
        renderButton: (
          parent: HTMLElement,
          options: {
            theme: string;
            size: string;
            width: string;
          }
        ) => void;
      };
    };
  };
}
