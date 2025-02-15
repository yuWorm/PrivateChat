import React from "react";
import { Login } from "./components/auth/Login";
import { ChatLayout } from "./components/layouts/ChatLayout";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
// import { WebSocketProvider } from "./contexts/WebSocketContext";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import { MatrixRain } from "./components/theme/MatrixRain";

// 将 ChatApp 组件移出去单独定义
const ChatApp: React.FC = () => {
  const { isLoggedIn, userData, login } = useAuth();

  if (!isLoggedIn) {
    return <Login onLogin={login} />;
  }

  return (
    <ChatLayout
      roomId={userData!.roomId}
      username={userData!.username}
      roomKey={userData!.roomKey}
      onLogout={function (): void {
        throw new Error("Function not implemented.");
      }}
    />
  );
};

// 主 App 组件
const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
};

// 抽离出 AppContent 组件来使用 useTheme
const AppContent: React.FC = () => {
  const { theme } = useTheme();

  return (
    <>
      {theme === "matrix" && <MatrixRain />}
      <ChatApp />
    </>
  );
};

export default App;
