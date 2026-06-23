import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, ChevronsUpDown, Loader2, Search, X } from 'lucide-react';
import { Input } from '@/shared/ui/input';
import { cn } from '@/shared/lib/utils';
import { useEntitySearch } from '../hooks/use-sections';

interface SearchableMultiSelectProps {
  endpoint: string;
  selectedIds: number[];
  onChange: (ids: number[]) => void;
  placeholder?: string;
}

export function SearchableMultiSelect({
  endpoint,
  selectedIds,
  onChange,
  placeholder,
}: SearchableMultiSelectProps) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);

  // We fetch entities based on the search term
  const { data, isLoading } = useEntitySearch(endpoint, searchTerm);
  
  // We also need to fetch the selected entities to display their names,
  // but for simplicity we can cache names of entities we've seen,
  // or just rely on the API returning names if we search for them.
  // Actually, standard behavior in this app is just displaying the names from the current search results or a separate cache.
  // We'll cache names locally when an item is selected.
  const [nameCache, setNameCache] = useState<Record<number, string>>({});

  const availableItems = data?.data?.data || data?.data || [];

  // Update name cache when new data arrives
  useEffect(() => {
    if (availableItems && Array.isArray(availableItems)) {
      const newCache = { ...nameCache };
      let updated = false;
      availableItems.forEach((item: any) => {
        // Handle names that might be JSON objects {en, ar} or strings
        let nameStr = '';
        if (typeof item.name === 'string') {
          try {
            const parsed = JSON.parse(item.name);
            nameStr = parsed.en || parsed.ar || item.name;
          } catch {
            nameStr = item.name;
          }
        } else if (item.name?.en) {
          nameStr = item.name.en;
        } else if (item.title) {
          // Banners/Sliders might use title instead of name
          if (typeof item.title === 'string') {
            try {
              const parsed = JSON.parse(item.title);
              nameStr = parsed.en || parsed.ar || item.title;
            } catch {
              nameStr = item.title;
            }
          } else if (item.title?.en) {
            nameStr = item.title.en;
          }
        } else if (item.slug) {
          nameStr = item.slug;
        } else {
          nameStr = `Item #${item.id}`;
        }
        
        if (newCache[item.id] !== nameStr) {
          newCache[item.id] = nameStr;
          updated = true;
        }
      });
      if (updated) {
        setNameCache(newCache);
      }
    }
  }, [availableItems, nameCache]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleItem = (id: number) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((i) => i !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  };

  const removeItem = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(selectedIds.filter((i) => i !== id));
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        type="button"
        className="flex min-h-[32px] w-full items-center justify-between rounded-md border border-input bg-transparent px-2.5 py-1 text-sm shadow-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={selectedIds.length === 0 ? 'text-muted-foreground' : 'text-foreground'}>
          {selectedIds.length === 0
            ? placeholder || t('common.select')
            : `${selectedIds.length} ${t('common.selected', 'selected')}`}
        </span>
        <ChevronsUpDown className="h-4 w-4 opacity-50" />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full rounded-md border bg-popover p-1 shadow-md">
          <div className="relative mb-1">
            <Search className="absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={t('common.search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-8 ps-7 text-xs"
            />
          </div>
          <div className="max-h-[200px] overflow-auto">
            {isLoading && searchTerm.length > 0 && (
              <p className="px-2 py-1.5 text-xs text-muted-foreground flex items-center gap-2">
                <Loader2 className="h-3 w-3 animate-spin" />
                {t('common.loading')}
              </p>
            )}
            {!isLoading && availableItems.length === 0 && searchTerm.length > 0 && (
              <p className="px-2 py-1.5 text-xs text-muted-foreground">
                {t('common.noData')}
              </p>
            )}
            {!isLoading && availableItems.length === 0 && searchTerm.length === 0 && (
              <p className="px-2 py-1.5 text-xs text-muted-foreground">
                {t('common.search', 'Type to search...')}
              </p>
            )}
            
            {Array.isArray(availableItems) && availableItems.map((item: any) => {
              const isSelected = selectedIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  className="flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 hover:bg-accent"
                  onClick={() => toggleItem(item.id)}
                >
                  <div
                    className={cn(
                      'flex h-4 w-4 items-center justify-center rounded-sm border shrink-0',
                      isSelected ? 'bg-primary border-primary' : 'border-input'
                    )}
                  >
                    {isSelected && <Check className="h-3 w-3 text-primary-foreground" />}
                  </div>
                  <span className="text-sm truncate">
                    {nameCache[item.id] || item.name || item.title || item.slug || `Item #${item.id}`}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {selectedIds.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {selectedIds.map((id) => (
            <span
              key={id}
              className="inline-flex items-center gap-1 rounded-md bg-secondary/50 px-2 py-1 text-xs border"
            >
              <span className="truncate max-w-[150px]">{nameCache[id] || `#${id}`}</span>
              <button
                type="button"
                onClick={(e) => removeItem(id, e)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
