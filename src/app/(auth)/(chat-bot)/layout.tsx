'use client';
import ChatSideBar from 'ui-component/chat-bot/chat-sidebar';
import AuthGuard from 'utils/route-guard/AuthGuard';

// ================================|| SIMPLE LAYOUT ||================================ //

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <ChatSideBar anchor="left">{children}</ChatSideBar>
    </AuthGuard>
  );
}
