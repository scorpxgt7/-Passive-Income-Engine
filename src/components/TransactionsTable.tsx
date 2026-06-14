import React from 'react';
import { Transaction } from '../types';
import { format, parseISO } from 'date-fns';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { cn } from '../lib/utils';

interface TransactionsTableProps {
  transactions: Transaction[];
}

export function TransactionsTable({ transactions }: TransactionsTableProps) {
  return (
    <div className="bg-[#141417] rounded-lg border border-[#2A2A2E] overflow-hidden">
      <div className="p-5 border-b border-[#2A2A2E]">
        <h3 className="text-[11px] uppercase tracking-[0.2em] text-[#8E8E93] mb-1">Recent Transactions</h3>
        <p className="text-xs text-[#55555A]">Automated log from connected platforms</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead className="text-[10px] text-[#55555A] uppercase tracking-widest bg-[#1A1A1F]">
            <tr>
              <th className="px-5 py-3 font-medium">Date</th>
              <th className="px-5 py-3 font-medium">Description</th>
              <th className="px-5 py-3 font-medium text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2A2A2E]">
            {transactions.slice(0, 5).map((t) => (
              <tr key={t.id} className="hover:bg-[#1A1A1F]/50 transition-colors">
                <td className="px-5 py-3 whitespace-nowrap text-[#8E8E93]">
                  {format(new Date(t.date), 'MMM d, yyyy')}
                </td>
                <td className="px-5 py-3 text-[#E0E0E0]">
                  {t.description}
                </td>
                <td className="px-5 py-3 text-right">
                  <div className="flex items-center justify-end gap-1.5 font-mono text-xs">
                    {t.type === 'sale' ? (
                      <>
                        <ArrowUpRight className="w-3 h-3 text-[#22C55E]" />
                        <span className="text-[#22C55E]">+₱{t.amount.toLocaleString()}</span>
                      </>
                    ) : (
                      <>
                        <ArrowDownRight className="w-3 h-3 text-[#EF4444]" />
                        <span className="text-[#EF4444]">-₱{t.amount.toLocaleString()}</span>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
