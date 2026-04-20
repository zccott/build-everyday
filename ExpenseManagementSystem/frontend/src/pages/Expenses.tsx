import React, { useEffect, useState } from 'react';
import { expenses, categories as apiCategories } from '../api';
import { Plus, Search, Filter, Trash2, Edit3, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Expenses: React.FC = () => {
  const [expenseList, setExpenseList] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<any>(null);
  
  // Filters
  const [search, setSearch] = useState('');
  const [categoryId, setCategoryId] = useState<string>('');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    category_id: '',
    notes: '',
    date: new Date().toISOString().split('T')[0]
  });

  const fetchData = async () => {
    try {
      const [expRes, catRes] = await Promise.all([
        expenses.getAll({ search, category_id: categoryId }),
        apiCategories.getAll()
      ]);
      setExpenseList(expRes.data);
      setCategories(catRes.data);
    } catch (err) {
      console.error("Error fetching data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [search, categoryId]);

  const handleOpenModal = (expense: any = null) => {
    if (expense) {
      setEditingExpense(expense);
      setFormData({
        name: expense.name,
        amount: expense.amount.toString(),
        category_id: expense.category_id.toString(),
        notes: expense.notes || '',
        date: new Date(expense.date).toISOString().split('T')[0]
      });
    } else {
      setEditingExpense(null);
      setFormData({
        name: '',
        amount: '',
        category_id: categories[0]?.id.toString() || '',
        notes: '',
        date: new Date().toISOString().split('T')[0]
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...formData,
      amount: parseFloat(formData.amount),
      category_id: parseInt(formData.category_id),
      date: new Date(formData.date).toISOString()
    };

    try {
      if (editingExpense) {
        await expenses.update(editingExpense.id, data);
      } else {
        await expenses.create(data);
      }
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      alert("Error saving expense");
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      await expenses.delete(id);
      fetchData();
    }
  };

  return (
    <div className="page-container">
      <header className="page-header">
        <h1 className="page-title">Expenses</h1>
        <button className="btn-primary" onClick={() => handleOpenModal()}>
          <Plus size={18} />
          <span>Add Expense</span>
        </button>
      </header>

      {/* Filters */}
      <div className="filters-bar glass-card mb-8">
        <div className="search-group">
          <Search size={18} className="text-muted" />
          <input 
            type="text" 
            placeholder="Search by name or notes..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <Filter size={18} className="text-muted" />
          <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Expense Table */}
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {expenseList.map((exp) => (
                <motion.tr 
                  key={exp.id} 
                  className="table-row"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <td className="text-muted">{new Date(exp.date).toLocaleDateString()}</td>
                  <td className="font-semibold">{exp.name}</td>
                  <td>
                    <span className="badge" style={{ backgroundColor: categories.find(c => c.id === exp.category_id)?.color + '22', color: categories.find(c => c.id === exp.category_id)?.color }}>
                      {categories.find(c => c.id === exp.category_id)?.name}
                    </span>
                  </td>
                  <td className="font-bold text-secondary">-${exp.amount.toFixed(2)}</td>
                  <td>
                    <div className="flex gap-2">
                      <button className="action-btn edit" onClick={() => handleOpenModal(exp)}>
                        <Edit3 size={16} />
                      </button>
                      <button className="action-btn delete" onClick={() => handleDelete(exp.id)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
            {!loading && expenseList.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-12 text-muted">No expenses found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="modal-overlay">
            <motion.div 
              className="glass-card modal-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="modal-header">
                <h2>{editingExpense ? 'Edit Expense' : 'Add New Expense'}</h2>
                <button className="close-btn" onClick={() => setIsModalOpen(false)}><X /></button>
              </div>
              <form onSubmit={handleSubmit} className="modal-form">
                <div className="input-grid">
                  <div className="input-group">
                    <label>Expense Name</label>
                    <input 
                      type="text" 
                      className="input-field" 
                      placeholder="e.g. Grocery Shopping"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label>Amount ($)</label>
                    <input 
                      type="number" 
                      step="0.01"
                      className="input-field" 
                      placeholder="0.00"
                      value={formData.amount}
                      onChange={(e) => setFormData({...formData, amount: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="input-grid">
                  <div className="input-group">
                    <label>Category</label>
                    <select 
                      className="input-field"
                      value={formData.category_id}
                      onChange={(e) => setFormData({...formData, category_id: e.target.value})}
                      required
                    >
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="input-group">
                    <label>Date</label>
                    <input 
                      type="date" 
                      className="input-field"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label>Notes (Optional)</label>
                  <textarea 
                    className="input-field" 
                    rows={3}
                    placeholder="Add details..."
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  />
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                  <button type="submit" className="btn-primary">
                    <Check size={18} />
                    <span>{editingExpense ? 'Update' : 'Save'}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        .filters-bar {
          display: flex;
          gap: 20px;
          padding: 16px 24px;
          align-items: center;
        }
        
        .search-group {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1;
        }
        
        .search-group input {
          background: none;
          border: none;
          outline: none;
          color: white;
          width: 100%;
          font-size: 15px;
        }

        .filter-group {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-left: 20px;
          border-left: 1px solid var(--border);
        }

        .filter-group select {
          background: none;
          border: none;
          color: white;
          outline: none;
          cursor: pointer;
        }

        .action-btn {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.05);
          color: var(--text-muted);
        }
        .action-btn:hover { background: rgba(255,255,255,0.1); color: white; }
        .action-btn.delete:hover { border: 1px solid #ff4b4b; color: #ff4b4b; background: rgba(255, 75, 75, 0.1); }
        .action-btn.edit:hover { border: 1px solid var(--primary); color: var(--primary); background: rgba(99, 102, 241, 0.1); }

        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .modal-content {
          width: 100%;
          max-width: 600px;
          padding: 40px;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
        }

        .close-btn { background: none; color: var(--text-muted); }

        .input-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 16px;
          margin-top: 32px;
        }

        .font-bold { font-weight: 700; }
        .text-center { text-align: center; }
        .py-12 { padding-top: 48px; padding-bottom: 48px; }
        .flex { display: flex; }
        .gap-2 { gap: 8px; }

        @media (max-width: 640px) {
          .filters-bar { flex-direction: column; align-items: stretch; }
          .filter-group { border-left: none; border-top: 1px solid var(--border); padding-left: 0; padding-top: 16px; }
          .input-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default Expenses;
