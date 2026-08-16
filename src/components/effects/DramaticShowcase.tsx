import React from 'react';
import ElectricBorder from './ElectricBorder';

export default function DramaticShowcase() {
  return (
    <div className="flex justify-center items-center py-10 w-full" style={{ background: "#080B10" }}>
      <ElectricBorder color="#dd8448" borderRadius={24} style={{ width: 350, height: 500 }}>
        <div className="content-top p-12 pb-4 flex flex-col h-full relative z-10">
          <div className="scrollbar-glass mb-auto">
            Dramatic
          </div>
          
          <p className="dramatic-title text-white">Electric Border</p>
        </div>

        <hr className="dramatic-divider" />

        <div className="content-bottom p-12 pt-4 relative z-10">
          <p className="dramatic-description text-white">
            In case you'd like to emphasize something very dramatically.
          </p>
        </div>
      </ElectricBorder>
    </div>
  );
}
