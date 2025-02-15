export const storage = {
  setUsername: (username: string): void => localStorage.setItem('username', username),
  getUsername: (): string | null => localStorage.getItem('username'),
  setRoomKey: (key: string): void => sessionStorage.setItem('roomKey', key),
  getRoomKey: (): string | null => sessionStorage.getItem('roomKey'),
  clearSession: (): void => {
    sessionStorage.removeItem('roomKey');
  }
};