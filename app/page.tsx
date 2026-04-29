'use client';
import React, { useState, useMemo } from 'react';
import {
  Database,
  TerminalSquare,
  BarChart3,
  Settings,
  Plus,
  Table as TableIcon,
  Search,
  Download,
  Upload,
  Play,
  Wand2,
  Edit2,
  Trash2,
  Check,
  X,
  ChevronDown
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';

type Tab = 'data' | 'sql' | 'charts';

interface Column {
  id: string;
  name: string;
  type: 'string' | 'number' | 'date';
}

interface TableData {
  id: string;
  name: string;
  columns: Column[];
  rows: Record<string, any>[];
}

const initialTables: TableData[] = [
  {
    id: 't1',
    name: 'Employees',
    columns: [
      { id: 'c1', name: 'ID', type: 'number' },
      { id: 'c2', name: 'Name', type: 'string' },
      { id: 'c3', name: 'Department', type: 'string' },
      { id: 'c4', name: 'Salary', type: 'number' },
    ],
    rows: [
      { id: 'r1', c1: 1, c2: 'Alice Smith', c3: 'Engineering', c4: 120000 },
      { id: 'r2', c1: 2, c2: 'Bob Jones', c3: 'Marketing', c4: 85000 },
      { id: 'r3', c1: 3, c2: 'Charlie Brown', c3: 'Sales', c4: 95000 },
      { id: 'r4', c1: 4, c2: 'Diana Prince', c3: 'Engineering', c4: 135000 },
    ]
  },
  {
    id: 't2',
    name: 'Sales',
    columns: [
      { id: 'c1', name: 'Month', type: 'string' },
      { id: 'c2', name: 'Revenue', type: 'number' },
      { id: 'c3', name: 'Expenses', type: 'number' },
    ],
    rows: [
      { id: 'r1', c1: 'Jan', c2: 45000, c3: 32000 },
      { id: 'r2', c1: 'Feb', c2: 52000, c3: 31000 },
      { id: 'r3', c1: 'Mar', c2: 48000, c3: 35000 },
      { id: 'r4', c1: 'Apr', c2: 61000, c3: 38000 },
      { id: 'r5', c1: 'May', c2: 59000, c3: 36000 },
    ]
  }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function DataStudio() {
  const [activeTab, setActiveTab] = useState<Tab>('data');
  const [tables, setTables] = useState<TableData[]>(initialTables);
  const [activeTableId, setActiveTableId] = useState<string>(initialTables[0].id);
  
  // Editing state for Data Grid
  const [editingCell, setEditingCell] = useState<{rowId: string, colId: string} | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  const [editingColumnName, setEditingColumnName] = useState<{tableId: string; colId: string} | null>(null);

  // SQL State
  const [sqlPrompt, setSqlPrompt] = useState<string>('');
  const [sqlQuery, setSqlQuery] = useState<string>('-- Select a table to view data\nSELECT * FROM Employees;');
  const [sqlResult, setSqlResult] = useState<TableData | null>(initialTables[0]);
  const [isGeneratingSQL, setIsGeneratingSQL] = useState(false);

  // Chart State
  const [chartType, setChartType] = useState<'bar' | 'line' | 'pie'>('bar');
  const [chartXAxis, setChartXAxis] = useState<string>('');
  const [chartYAxis, setChartYAxis] = useState<string>('');

  const activeTable = tables.find(t => t.id === activeTableId);

  // Data Grid Operations
  const handleCellEdit = (rowId: string, colId: string, value: any) => {
    setEditingCell({ rowId, colId });
    setEditValue(String(value));
  };

  const handleCellSave = () => {
    if (!editingCell || !activeTable) return;
    
    const updatedTables = tables.map(table => {
      if (table.id !== activeTable.id) return table;
      
      const updatedRows = table.rows.map(row => {
        if (row.id !== editingCell.rowId) return row;
        
        const colType = table.columns.find(c => c.id === editingCell.colId)?.type;
        let parsedValue: any = editValue;
        if (colType === 'number') parsedValue = Number(editValue) || 0;
        
        return { ...row, [editingCell.colId]: parsedValue };
      });
      
      return { ...table, rows: updatedRows };
    });
    
    setTables(updatedTables);
    setEditingCell(null);
  };

  const handleAddRow = () => {
    if (!activeTable) return;
    const newRowId = `r${Date.now()}`;
    const newRow: Record<string, any> = { id: newRowId };
    activeTable.columns.forEach(col => {
      newRow[col.id] = col.type === 'number' ? 0 : '';
    });
    
    const updatedTables = tables.map(t => 
      t.id === activeTable.id ? { ...t, rows: [...t.rows, newRow] } : t
    );
    setTables(updatedTables);
  };

  const handleAddColumn = () => {
    if (!activeTable) return;
    const newColId = `c${Date.now()}`;
    const newCol: Column = { id: newColId, name: `New Col`, type: 'string' };
    
    const updatedTables = tables.map(t => {
      if (t.id !== activeTable.id) return t;
      return {
        ...t,
        columns: [...t.columns, newCol],
        rows: t.rows.map(r => ({ ...r, [newColId]: '' }))
      };
    });
    setTables(updatedTables);
  };
  
  const handleCreateTable = () => {
    const newTable: TableData = {
      id: `t${Date.now()}`,
      name: `New Table ${tables.length + 1}`,
      columns: [{ id: 'c1', name: 'Column 1', type: 'string' }],
      rows: []
    };
    setTables([...tables, newTable]);
    setActiveTableId(newTable.id);
  };
  
  const handleUpdateColumnName = (tableId: string, colId: string, newName: string) => {
    setTables(tables.map(t => {
      if (t.id !== tableId) return t;
      return {
        ...t,
        columns: t.columns.map(c => c.id === colId ? { ...c, name: newName } : c)
      }
    }));
  }

  const handleDeleteRow = (rowId: string) => {
    if (!activeTable) return;
    setTables(tables.map(t => {
      if (t.id !== activeTable.id) return t;
      return { ...t, rows: t.rows.filter(r => r.id !== rowId) };
    }));
  };

  // Simulated AI SQL Generation
  const handleGenerateSQL = () => {
    if (!sqlPrompt) return;
    setIsGeneratingSQL(true);
    
    setTimeout(() => {
      setSqlQuery(`-- Generated based on: "${sqlPrompt}"\nSELECT Department, AVG(Salary) as AvgSalary\nFROM Employees\nGROUP BY Department\nORDER BY AvgSalary DESC;`);
      
      // Simulate result
      setSqlResult({
        id: 'res1',
        name: 'Query Result',
        columns: [
          { id: 'c1', name: 'Department', type: 'string' },
          { id: 'c2', name: 'AvgSalary', type: 'number' }
        ],
        rows: [
          { id: 'r1', c1: 'Engineering', c2: 127500 },
          { id: 'r2', c1: 'Sales', c2: 95000 },
          { id: 'r3', c1: 'Marketing', c2: 85000 }
        ]
      });
      setIsGeneratingSQL(false);
    }, 1500);
  };

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm z-10 shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <div className="flex items-center gap-2 font-bold text-lg">
            <div className="w-8 h-8 rounded-md bg-blue-600 text-white flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            Data Studio
          </div>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
          <button 
            onClick={() => setActiveTab('data')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'data' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}
          >
            <TableIcon className="w-5 h-5" />
            Data Manager
          </button>
          <button 
            onClick={() => setActiveTab('sql')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'sql' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}
          >
            <TerminalSquare className="w-5 h-5" />
            AI SQL Assistant
          </button>
          <button 
            onClick={() => setActiveTab('charts')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'charts' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}
          >
            <BarChart3 className="w-5 h-5" />
            Visualizations
          </button>
        </nav>
        
        <div className="p-4 border-t border-gray-200">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
            <Settings className="w-5 h-5" />
            Settings
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-[#F7F9FC]">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0">
          <h1 className="text-xl font-semibold text-gray-800">
            {activeTab === 'data' && 'Data Manager'}
            {activeTab === 'sql' && 'SQL Generation Studio'}
            {activeTab === 'charts' && 'Visualizations & Reports'}
          </h1>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 shadow-sm transition-all">
              <Upload className="w-4 h-4" />
              Import CSV
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </header>

        {/* Tab Content */}
        <div className="flex-1 overflow-auto p-6">
          {activeTab === 'data' && (
            <div className="flex flex-col lg:flex-row gap-6 h-full max-h-full">
              {/* Tables List */}
              <div className="w-full lg:w-64 bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col shrink-0 min-h-[200px] lg:min-h-0">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="font-semibold text-gray-800">Tables</h3>
                  <button onClick={handleCreateTable} className="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-50 rounded" title="Create New Table">
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <div className="overflow-y-auto p-2">
                  {tables.map(table => (
                    <button
                      key={table.id}
                      onClick={() => setActiveTableId(table.id)}
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors mb-1 ${
                        activeTableId === table.id ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <TableIcon className="w-4 h-4 opacity-70" />
                        {table.name}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Data Grid */}
              <div className="flex-1 bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col min-w-0">
                {activeTable ? (
                  <>
                    <div className="p-4 border-b border-gray-200 flex justify-between items-center flex-wrap gap-4">
                      <div className="flex items-center gap-2">
                         <h2 className="text-lg font-bold text-gray-900">{activeTable.name}</h2>
                         <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{activeTable.rows.length} rows</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input type="text" placeholder="Search data..." className="pl-9 pr-4 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                        </div>
                        <button onClick={handleAddColumn} className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                          <Plus className="w-4 h-4" /> Add Column
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex-1 overflow-auto">
                      <table className="w-full text-left text-sm whitespace-nowrap min-w-full">
                        <thead className="bg-gray-50 text-gray-600 sticky top-0 z-10 border-b border-gray-200">
                          <tr>
                            <th className="px-4 py-3 font-semibold border-r border-gray-200 w-12 text-center bg-gray-50">#</th>
                            {activeTable.columns.map(col => (
                              <th key={col.id} className="px-4 py-3 font-semibold border-r border-gray-200 hover:bg-gray-100 bg-gray-50 group relative">
                                <div className="flex items-center justify-between">
                                  <div 
                                    className="flex items-center gap-2 cursor-text"
                                    onClick={(e) => {
                                      if (editingColumnName?.colId !== col.id) {
                                        setEditingColumnName({tableId: activeTable.id, colId: col.id});
                                      }
                                    }}
                                  >
                                     <span className="uppercase text-xs font-bold text-gray-400">{col.type === 'number' ? '#' : col.type === 'date' ? '📅' : 'Aa'}</span>
                                     {editingColumnName?.colId === col.id ? (
                                        <input 
                                          autoFocus
                                          type="text"
                                          defaultValue={col.name}
                                          className="outline-none bg-blue-50 border border-blue-500 rounded px-1 min-w-[80px]"
                                          onBlur={(e) => {
                                            handleUpdateColumnName(activeTable.id, col.id, e.target.value);
                                            setEditingColumnName(null);
                                          }}
                                          onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                              handleUpdateColumnName(activeTable.id, col.id, e.currentTarget.value);
                                              setEditingColumnName(null);
                                            }
                                            if (e.key === 'Escape') setEditingColumnName(null);
                                          }}
                                        />
                                     ) : col.name}
                                  </div>
                                </div>
                              </th>
                            ))}
                            <th className="px-4 py-3 font-semibold bg-gray-50 w-full min-w-[100px]">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {activeTable.rows.map((row, idx) => (
                            <tr key={row.id} className="hover:bg-blue-50/30 group">
                              <td className="px-4 py-2 border-r border-gray-200 text-center text-gray-400 font-medium bg-gray-50/50 group-hover:bg-blue-50/50">{idx + 1}</td>
                              {activeTable.columns.map(col => {
                                const isEditing = editingCell?.rowId === row.id && editingCell?.colId === col.id;
                                return (
                                  <td 
                                    key={col.id} 
                                    className="px-4 py-2 border-r border-gray-200 relative cursor-text group/cell hover:bg-blue-50/50 min-w-[150px]"
                                    onClick={() => !isEditing && handleCellEdit(row.id, col.id, row[col.id])}
                                  >
                                    {isEditing ? (
                                      <div className="flex items-center border-2 border-blue-500 rounded bg-white absolute inset-y-0.5 inset-x-0.5 z-20 shadow">
                                        <input 
                                          autoFocus
                                          type={col.type === 'number' ? 'number' : 'text'}
                                          value={editValue}
                                          onChange={(e) => setEditValue(e.target.value)}
                                          onBlur={handleCellSave}
                                          onKeyDown={(e) => e.key === 'Enter' ? handleCellSave() : e.key === 'Escape' && setEditingCell(null)}
                                          className="w-full h-full px-3 outline-none text-sm bg-transparent"
                                        />
                                      </div>
                                    ) : (
                                      <div className="min-h-[22px] truncate px-1">
                                        {row[col.id] !== undefined && row[col.id] !== '' ? (
                                          col.type === 'number' ? row[col.id].toLocaleString() : String(row[col.id])
                                        ) : (
                                          <span className="text-gray-300 italic text-xs">tap to edit</span>
                                        )}
                                      </div>
                                    )}
                                  </td>
                                );
                              })}
                              <td className="px-4 py-2">
                                 <button onClick={() => handleDeleteRow(row.id)} className="text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-50 rounded">
                                   <Trash2 className="w-4 h-4" />
                                 </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="p-3 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
                      <button onClick={handleAddRow} className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors border border-transparent">
                        <Plus className="w-4 h-4" /> Add New Row
                      </button>
                      <span className="text-xs text-gray-500">Click any cell to edit</span>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
                    <TableIcon className="w-16 h-16 text-gray-300 mb-4" />
                    <p className="font-medium text-gray-600">No table selected</p>
                    <p className="text-sm mt-1">Select a table from the sidebar or define a new one.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'sql' && (
            <div className="flex flex-col h-full gap-6 w-full max-w-none">
              {/* Top Row: AI Prompt & SQL output */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 shrink-0 h-64 lg:h-72">
                
                {/* AI Prompt */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 border-b border-transparent flex items-center gap-2 text-white shrink-0">
                    <Wand2 className="w-5 h-5" />
                    <h2 className="font-semibold text-lg">Ask AI to Generate SQL (Arabic Supported)</h2>
                  </div>
                  <div className="flex-1 p-4 flex flex-col bg-slate-50">
                    <textarea 
                      dir="auto"
                      placeholder="e.g. Generate a query to find the top 5 highest paid employees... &#10;أو باللغة العربية: استخرج الموظفين الأعلى راتباً في قسم المبيعات"
                      value={sqlPrompt}
                      onChange={(e) => setSqlPrompt(e.target.value)}
                      className="flex-1 w-full bg-white border border-gray-300 rounded-lg p-4 font-sans text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none shadow-sm"
                    />
                    <div className="mt-4 flex justify-end">
                      <button 
                        onClick={handleGenerateSQL}
                        disabled={!sqlPrompt || isGeneratingSQL}
                        className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg font-medium shadow-md transition-all active:scale-95"
                      >
                        {isGeneratingSQL ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <Wand2 className="w-4 h-4" />
                        )}
                        Generate & Run
                      </button>
                    </div>
                  </div>
                </div>

                {/* SQL Editor */}
                <div className="bg-[#1E1E1E] border border-gray-800 rounded-xl shadow-sm flex flex-col overflow-hidden">
                  <div className="bg-[#2D2D2D] p-3 border-b border-[#404040] flex justify-between items-center text-gray-300 shrink-0">
                     <div className="flex items-center gap-2 font-mono text-sm">
                       <TerminalSquare className="w-4 h-4 text-green-400" />
                       query.sql
                     </div>
                     <button className="text-xs bg-gray-700 hover:bg-gray-600 text-white px-4 py-1.5 rounded transition-colors flex items-center gap-1.5 focus:ring-2 focus:ring-gray-400">
                       <Play className="w-3 h-3 fill-current" /> Execute
                     </button>
                  </div>
                  <div className="flex-1 p-5 font-mono text-sm text-green-300/90 overflow-auto whitespace-pre-wrap outline-none" contentEditable suppressContentEditableWarning>
                    {sqlQuery}
                  </div>
                </div>
              </div>

              {/* Bottom Row: Results */}
              <div className="flex-1 bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col overflow-hidden min-h-[300px]">
                <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center shrink-0">
                  <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                    <TableIcon className="w-4 h-4 text-blue-600" /> Query Results
                  </h3>
                  {sqlResult && (
                    <span className="text-xs text-green-700 bg-green-100 border border-green-200 px-3 py-1 rounded-full font-medium shadow-sm">
                      Execution Successful: {sqlResult.rows.length} rows
                    </span>
                  )}
                </div>
                <div className="flex-1 overflow-auto p-4">
                  {sqlResult ? (
                    <table className="w-full text-left text-sm whitespace-nowrap border border-gray-200 rounded-lg overflow-hidden">
                      <thead className="bg-gray-100 text-gray-700 sticky top-0 shadow-sm z-10">
                        <tr>
                          <th className="px-5 py-3 font-semibold border-b border-r border-gray-200 w-12 text-center">#</th>
                          {sqlResult.columns.map(col => (
                            <th key={col.id} className="px-5 py-3 font-semibold border-b border-r border-gray-200">{col.name}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {sqlResult.rows.map((row, idx) => (
                          <tr key={row.id} className="hover:bg-blue-50/50 transition-colors">
                            <td className="px-5 py-2.5 border-r border-gray-200 text-center text-gray-400 bg-gray-50/30">{idx + 1}</td>
                            {sqlResult.columns.map(col => (
                              <td key={col.id} className="px-5 py-2.5 border-r border-gray-200 font-medium text-gray-700">
                                {col.type === 'number' ? row[col.id].toLocaleString() : row[col.id]}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="h-full flex items-center justify-center text-gray-400">
                      Run a query to see results here
                    </div>
                  )}
                </div>
              </div>

            </div>
          )}

          {activeTab === 'charts' && (
            <div className="flex flex-col md:flex-row gap-6 h-full max-w-7xl mx-auto w-full">
              {/* Chart Configurator */}
              <div className="w-full md:w-80 bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col shrink-0 min-h-0 overflow-y-auto">
                <div className="p-5 border-b border-gray-200 sticky top-0 bg-white z-10">
                  <h2 className="font-bold text-lg text-gray-900">Chart Configuration</h2>
                </div>
                
                <div className="p-5 space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Source Table</label>
                    <div className="relative">
                      <select 
                        value={activeTableId}
                        onChange={(e) => setActiveTableId(e.target.value)}
                        className="w-full appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-4 py-2.5 outline-none shadow-sm transition-all hover:bg-gray-100/50"
                      >
                        {tables.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                      </select>
                      <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Chart Type</label>
                    <div className="grid grid-cols-3 gap-2">
                      <button onClick={() => setChartType('bar')} className={`py-2 px-3 flex flex-col items-center justify-center gap-1.5 rounded-lg border text-xs font-medium transition-all ${chartType === 'bar' ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm' : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'}`}>
                        <BarChart3 className="w-5 h-5" /> Bar
                      </button>
                      <button onClick={() => setChartType('line')} className={`py-2 px-3 flex flex-col items-center justify-center gap-1.5 rounded-lg border text-xs font-medium transition-all ${chartType === 'line' ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm' : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'}`}>
                        <BarChart className="w-5 h-5" /> Line
                      </button>
                      <button onClick={() => setChartType('pie')} className={`py-2 px-3 flex flex-col items-center justify-center gap-1.5 rounded-lg border text-xs font-medium transition-all ${chartType === 'pie' ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm' : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'}`}>
                        <PieChart className="w-5 h-5" /> Pie
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">X-Axis (Category)</label>
                    <div className="relative">
                      <select 
                        value={chartXAxis}
                        onChange={(e) => setChartXAxis(e.target.value)}
                        className="w-full appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-4 py-2.5 outline-none shadow-sm transition-all hover:bg-gray-100/50"
                      >
                        <option value="">Select column...</option>
                        {activeTable?.columns.map(c => 
                          <option key={c.id} value={c.id}>{c.name}</option>
                        )}
                      </select>
                      <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Y-Axis (Value)</label>
                    <div className="relative">
                      <select 
                        value={chartYAxis}
                        onChange={(e) => setChartYAxis(e.target.value)}
                        className="w-full appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-4 py-2.5 outline-none shadow-sm transition-all hover:bg-gray-100/50"
                      >
                        <option value="">Select numerical column...</option>
                        {activeTable?.columns.filter(c => c.type === 'number').map(c => 
                          <option key={c.id} value={c.id}>{c.name}</option>
                        )}
                      </select>
                      <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Chart Display */}
              <div className="flex-1 bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex flex-col min-h-[400px]">
                {activeTable && chartXAxis && chartYAxis ? (
                   <h3 className="text-xl font-bold text-gray-800 mb-6 text-center border-b pb-4">
                     {activeTable.name} Overview
                   </h3>
                ) : null}
                
                <div className="flex-1 relative mt-4">
                  {activeTable && chartXAxis && chartYAxis ? (
                    <ResponsiveContainer width="100%" height="100%">
                      {chartType === 'bar' ? (
                        <BarChart data={activeTable.rows} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                          <CartesianGrid strokeDasharray="3 3" opacity={0.3} vertical={false} />
                          <XAxis dataKey={chartXAxis} tick={{fill: '#6b7280'}} tickMargin={10} axisLine={false} tickLine={false} />
                          <YAxis tick={{fill: '#6b7280'}} tickMargin={10} axisLine={false} tickLine={false} />
                          <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} cursor={{fill: 'transparent'}} />
                          <Legend wrapperStyle={{paddingTop: '20px'}} />
                          <Bar dataKey={chartYAxis} fill="#3b82f6" radius={[6, 6, 0, 0]} maxBarSize={60} />
                        </BarChart>
                      ) : chartType === 'line' ? (
                        <LineChart data={activeTable.rows} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                          <CartesianGrid strokeDasharray="3 3" opacity={0.3} vertical={false} />
                          <XAxis dataKey={chartXAxis} tick={{fill: '#6b7280'}} tickMargin={10} axisLine={false} tickLine={false} />
                          <YAxis tick={{fill: '#6b7280'}} tickMargin={10} axisLine={false} tickLine={false} />
                          <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                          <Legend wrapperStyle={{paddingTop: '20px'}} />
                          <Line type="monotone" dataKey={chartYAxis} stroke="#3b82f6" strokeWidth={4} activeDot={{ r: 6, strokeWidth: 0, fill: '#2563eb' }} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} />
                        </LineChart>
                      ) : (
                        <PieChart>
                          <Pie
                            data={activeTable.rows.filter(r => r[chartXAxis] && r[chartYAxis])}
                            cx="50%"
                            cy="50%"
                            innerRadius={90}
                            outerRadius={160}
                            fill="#8884d8"
                            paddingAngle={2}
                            dataKey={chartYAxis}
                            nameKey={chartXAxis}
                            label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                            labelLine={false}
                          >
                            {activeTable.rows.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                          <Legend wrapperStyle={{paddingTop: '20px'}} />
                        </PieChart>
                      )}
                    </ResponsiveContainer>
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 bg-gray-50/50 rounded-lg border-2 border-dashed border-gray-200 m-8">
                      <BarChart3 className="w-16 h-16 text-gray-300 mb-4" />
                      <p className="text-gray-500 font-medium">Visualization Area</p>
                      <p className="text-sm mt-1">Select an X and Y axis to generate a chart.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
