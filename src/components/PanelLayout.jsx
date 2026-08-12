const PanelLayout = ({ sidebar, header, children }) => {
  return (
    <div className="flex flex-col h-screen bg-sky-50 text-slate-800 font-sans overflow-hidden">
      {/* Dynamic Header */}
      {header}

      {/* Main Layout Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Dynamic Sidebar */}
        {sidebar}

        {/* Dynamic Center Page Content */}
        <main className="flex-1 overflow-y-auto bg-sky-50">
          <div className="p-6 max-w-7xl w-full mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PanelLayout;
