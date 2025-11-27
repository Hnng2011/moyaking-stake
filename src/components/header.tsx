import { AppKitButton } from "@reown/appkit/react";

export function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-gray-800 px-8">
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold text-white inline-flex items-center gap-4">
          <div className="h-8 w-8">
            <img src="/logo.png" className="object-contain" />
          </div>
          Moyaking
        </span>
      </div>

      <AppKitButton />
    </header>
  );
}
