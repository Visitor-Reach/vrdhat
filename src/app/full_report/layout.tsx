import "./style.css";
import "./page2.css";
import "./page3.css";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <>
        {children}
      </>
      
        
    );
  }