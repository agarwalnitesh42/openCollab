import mergeTW from '@/utils/mergeTW';

export default ({ className, count }: { className?: string; count: number }) => (
  <div className={mergeTW(`flex gap-x-3 items-center text-sm text-slate-400 ${className}`)}>
    <span className="block flex-none w-1 h-1 bg-slate-500 rounded-full"></span>
    <div className="flex items-center gap-x-1">
      {count}
      <span>Impressions</span>
    </div>
  </div>
);
