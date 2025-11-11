import React from 'react';
import { Info } from 'lucide-react';

interface TooltipProps {
  text: string;
  type?: 'info' | 'warning' | 'success';
}

export function Tooltip({ text, type = 'info' }: TooltipProps) {
  const colors = {
    info: 'text-blue-600 bg-blue-50 border-blue-200',
    warning: 'text-amber-600 bg-amber-50 border-amber-200',
    success: 'text-green-600 bg-green-50 border-green-200',
  };

  return (
    <div className={`flex items-start gap-2 mt-1.5 p-2 rounded-md border ${colors[type]} text-sm`}>
      <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
      <p className="leading-relaxed">{text}</p>
    </div>
  );
}

interface FormFieldWithTooltipProps {
  label: string;
  children: React.ReactNode;
  tooltip?: string;
  tooltipType?: 'info' | 'warning' | 'success';
  required?: boolean;
}

export function FormFieldWithTooltip({
  label,
  children,
  tooltip,
  tooltipType = 'info',
  required = false,
}: FormFieldWithTooltipProps) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {tooltip && <Tooltip text={tooltip} type={tooltipType} />}
    </div>
  );
}
