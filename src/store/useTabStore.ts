import { create } from 'zustand';

export interface Tab {
  id: string;
  name: string;
  path: string;
  isClosable?: boolean;
}

interface TabStore {
  openTabs: Tab[];
  activeTabId: string;
  addTab: (tab: Tab) => void;
  closeTab: (tabId: string, navigate: (path: string) => void) => void;
  setActiveTabId: (id: string) => void;
  resetTabs: () => void;
}

const initialTabs: Tab[] = [
  { id: 'workspace', name: 'Workspace', path: '/crm/workspace', isClosable: false },
  { id: 'site-map', name: 'Site Map', path: '/crm/site-map', isClosable: true }
];

export const useTabStore = create<TabStore>((set) => ({
  openTabs: initialTabs,
  activeTabId: 'site-map',
  
  addTab: (tab) => set((state) => {
    const exists = state.openTabs.some((t) => t.id === tab.id);
    const updatedTabs = exists 
      ? state.openTabs.map(t => t.id === tab.id ? { ...t, path: tab.path } : t)
      : [...state.openTabs, tab];
    return { 
      openTabs: updatedTabs, 
      activeTabId: tab.id 
    };
  }),
  
  closeTab: (tabId, navigate) => set((state) => {
    const tabToClose = state.openTabs.find(t => t.id === tabId);
    if (tabToClose && tabToClose.isClosable === false) {
      return {};
    }

    const filtered = state.openTabs.filter(t => t.id !== tabId);
    
    // If the closed tab was the active one, choose a new active tab and navigate to it
    if (state.activeTabId === tabId) {
      // Find the index of the closed tab in the previous list
      const index = state.openTabs.findIndex(t => t.id === tabId);
      // Try to select the tab next to it, or previous, or fallback to first
      const nextActiveTab = filtered[index] || filtered[index - 1] || filtered[0] || initialTabs[0];
      
      // Defer navigation to avoid state-update during render errors
      setTimeout(() => navigate(nextActiveTab.path), 0);
      return { 
        openTabs: filtered, 
        activeTabId: nextActiveTab.id 
      };
    }
    
    return { openTabs: filtered };
  }),
  
  setActiveTabId: (id) => set({ activeTabId: id }),
  
  resetTabs: () => set({ openTabs: initialTabs, activeTabId: 'site-map' })
}));
