import React from 'react';
import { Product } from '../types';
import { Package, TrendingUp, Clock } from 'lucide-react';
import { cn } from '../lib/utils';

interface AssetsListProps {
  products: Product[];
}

export function AssetsList({ products }: AssetsListProps) {
  return (
    <div className="bg-[#141417] rounded-lg border border-[#2A2A2E] p-5">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-[11px] uppercase tracking-[0.2em] text-[#8E8E93] mb-1">Current Assets</h3>
          <p className="text-xs text-[#55555A]">Portfolio overview</p>
        </div>
        <button className="text-[10px] uppercase tracking-wider font-bold text-white bg-[#1A1A1F] px-3 py-1.5 border border-[#2A2A2E] rounded hover:bg-[#2A2A2E] transition-colors">
          Add Asset
        </button>
      </div>

      <ul className="space-y-3">
        {products.map((product) => (
          <li key={product.id} className={cn(
            "flex justify-between items-center text-xs p-3 rounded border border-[#2A2A2E] transition-opacity",
            product.status === 'active' ? "bg-[#1A1A1F]" : "bg-[#141417] opacity-60 hover:opacity-100"
          )}>
            <div className="flex items-center gap-3">
               <div>
                  <span className="text-white font-medium block">{product.name}</span>
                  <span className="text-[10px] font-mono text-[#8E8E93]">₱{product.price.toLocaleString()} / unit</span>
               </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="text-[10px] uppercase tracking-widest text-[#55555A] block mb-0.5">Sales</span>
                <span className="font-mono text-white flex items-center gap-1 justify-end">
                  {product.sales}
                  {product.sales > 0 && <TrendingUp className="w-3 h-3 text-[#22C55E]" />}
                </span>
              </div>
              <span className={cn(
                "px-2 py-0.5 rounded text-[10px] uppercase tracking-widest font-bold",
                product.status === 'active' ? "text-[#22C55E] bg-[#22C55E15]" : "text-[#3B82F6] bg-[#3B82F615]"
              )}>
                {product.status === 'active' ? 'LIVE' : 'DEV'}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
