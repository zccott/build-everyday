import React, { useEffect, useState } from 'react';
import { analytics, expenses } from '../api';
import { TrendingUp, TrendingDown, Wallet, Calendar, AlertTriangle, Sparkles } from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line 
} from 'recharts';

const Dashboard: React.FC = () => {
  const [summary, setSummary] = useState<any>(null);
  const [trends, setTrends] = useState<any[]>([]);
  const [distribution, setDistribution] = useState<any[]>([]);
  const [recentExpenses, setRecentExpenses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sumRes, trendRes, distRes, expRes] = await Promise.all([
          analytics.getSummary(),
          analytics.getTrends(),
          analytics.getDistribution(),
          expenses.getAll({ limit: 5 })
        ]);
        setSummary(sumRes.data);
        setTrends(trendRes.data);
        setDistribution(distRes.data);
        setRecentExpenses(expRes.data);
      } catch (err) {
        console.error("Error fetching dashboard data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="loading">Loading insights...</div>;

  const COLORS = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#8b5cf6', '#6b7280'];

  return (
    <div className="page-container">
      <header className="page-header">
        <div>
          <h1 className="page-title">Financial Overview</h1>
          <p className="text-muted">Welcome back! Here's what's happening with your money.</p>
        </div>
        <div className="date-badge glass-card">
          <Calendar size={18} />
          <span>{new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
        </div>
      </header>

      {/* Summary Cards */}
      <div className="stats-grid">
        <div className="glass-card stat-card">
          <div className="stat-label">Monthly Expenses</div>
          <div className="stat-value text-primary">${summary?.monthly_expenses.toFixed(2)}</div>
          <div className={`stat-change ${summary?.monthly_expenses > 0 ? "up" : ""}`}>
             {summary?.monthly_expenses > 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
             <span>vs last month</span>
          </div>
        </div>
        <div className="glass-card stat-card">
          <div className="stat-label">Remaining Balance</div>
          <div className="stat-value text-accent">${summary?.remaining_balance.toFixed(2)}</div>
          <div className="stat-progress-bg">
            <div className="stat-progress-bar" style={{ width: `${summary?.savings_percentage}%`, backgroundColor: 'var(--accent)' }}></div>
          </div>
        </div>
        <div className="glass-card stat-card">
          <div className="stat-label">Savings Rate</div>
          <div className="stat-value text-secondary">{summary?.savings_percentage.toFixed(1)}%</div>
          <p className="text-muted small">of monthly income</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="dashboard-grid">
        <div className="glass-card chart-container col-span-2">
          <h3>Spending Trend</h3>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={trends}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Bar dataKey="amount" fill="#6366f1" radius={[6, 6, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card chart-container">
          <h3>Categories</h3>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={distribution}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="amount"
                >
                  {distribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="legend">
             {distribution.map((entry, index) => (
               <div key={index} className="legend-item">
                 <div className="legend-color" style={{ backgroundColor: entry.color || COLORS[index % COLORS.length] }}></div>
                 <span>{entry.name}</span>
               </div>
             ))}
          </div>
        </div>
      </div>

      {/* Insights & Recent Expenses */}
      <div className="dashboard-grid mt-8">
        <div className="glass-card">
          <div className="flex-between mb-4">
            <h3>Recent Transactions</h3>
            <button className="text-primary small" onClick={() => window.location.href='/expenses'}>View All</button>
          </div>
          <div className="recent-list">
            {recentExpenses.length > 0 ? recentExpenses.map((exp) => (
              <div key={exp.id} className="transaction-item">
                <div className="transaction-info">
                  <div className="transaction-icon glass-card" style={{ padding: '8px', borderRadius: '12px' }}>
                    <Wallet size={16} />
                  </div>
                  <div>
                    <div className="font-semibold">{exp.name}</div>
                    <div className="text-muted small">{new Date(exp.date).toLocaleDateString()}</div>
                  </div>
                </div>
                <div className="transaction-amount">-${exp.amount.toFixed(2)}</div>
              </div>
            )) : <p className="text-muted">No recent expenses</p>}
          </div>
        </div>

        <div className="glass-card insight-card">
          <div className="insight-header">
            <Sparkles size={20} className="text-secondary" />
            <h3>AI Insights</h3>
          </div>
          <div className="insight-content">
            <div className="insight-item">
              <div className="insight-icon bg-blue"><TrendingUp size={16} /></div>
              <p>You spent <strong>12% more</strong> on Food this week compared to last week.</p>
            </div>
            <div className="insight-item">
              <div className="insight-icon bg-green"><TrendingDown size={16} /></div>
              <p>Your Shopping expenses are <strong>down by 30%</strong>. Great job!</p>
            </div>
            <div className="insight-item warning">
              <div className="insight-icon bg-yellow"><AlertTriangle size={16} /></div>
              <p>You've reached <strong>85%</strong> of your monthly dining budget.</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .flex-between { display: flex; justify-content: space-between; align-items: center; }
        .text-muted { color: var(--text-muted); }
        .text-primary { color: var(--primary); }
        .text-accent { color: var(--accent); }
        .text-secondary { color: var(--secondary); }
        .small { font-size: 14px; }
        .font-semibold { font-weight: 600; }
        .mt-8 { margin-top: 32px; }
        .mb-4 { margin-bottom: 16px; }
        .col-span-2 { grid-column: span 2; }
        
        .date-badge {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 16px;
          border-radius: 12px;
          font-weight: 600;
        }

        .stat-change { 
          display: flex; 
          align-items: center; 
          gap: 4px; 
          font-size: 12px; 
          font-weight: 600;
          margin-top: 4px; 
        }
        .stat-change.up { color: #ff4b4b; }
        .stat-change.down { color: var(--accent); }

        .stat-progress-bg {
          width: 100%;
          height: 6px;
          background: rgba(255,255,255,0.05);
          border-radius: 10px;
          margin-top: 12px;
          overflow: hidden;
        }
        .stat-progress-bar { height: 100%; border-radius: 10px; }

        .chart-wrapper { margin-top: 24px; }
        
        .legend {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 16px;
        }
        .legend-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
        }
        .legend-color {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .transaction-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid var(--border);
        }
        .transaction-item:last-child { border-bottom: none; }
        .transaction-info { display: flex; align-items: center; gap: 12px; }
        .transaction-amount { font-weight: 700; color: #ff4b4b; }

        .insight-card { border-left: 4px solid var(--secondary); }
        .insight-header { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; }
        .insight-content { display: flex; flex-direction: column; gap: 16px; }
        .insight-item { display: flex; gap: 12px; font-size: 14px; }
        .insight-icon {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .bg-blue { background: rgba(99, 102, 241, 0.1); color: var(--primary); }
        .bg-green { background: rgba(16, 185, 129, 0.1); color: var(--accent); }
        .bg-yellow { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
        
        .loading { display: flex; justify-content: center; align-items: center; height: 300px; color: var(--text-muted); }

        @media (max-width: 1024px) {
          .col-span-2 { grid-column: span 1; }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
