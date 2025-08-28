const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-white">
      <div className="p-4 md:p-8">
        {children}
      </div>
    </div>
  );
};

export default Layout;
