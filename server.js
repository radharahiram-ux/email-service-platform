const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock email data
let emails = [
  {
    id: 1,
    from: 'priya.sharma@company.com',
    fromName: 'Priya Sharma',
    subject: 'Q4 Marketing Strategy Review',
    preview: 'Hi team, I wanted to share our quarterly performance metrics...',
    body: 'Hi team,\n\nI wanted to share our quarterly performance metrics and discuss our strategy for Q4. We\'ve seen a 23% increase in engagement rates and our conversion metrics are looking strong.\n\nLet\'s schedule a meeting to discuss next steps.\n\nBest regards,\nPriya',
    time: '10:30 AM',
    starred: true,
    read: false,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop'
  },
  {
    id: 2,
    from: 'rahul.verma@tech.io',
    fromName: 'Rahul Verma',
    subject: 'Server Migration Update',
    preview: 'The migration to AWS has been completed successfully...',
    body: 'The migration to AWS has been completed successfully. All services are running smoothly with 99.9% uptime. Performance metrics show 40% improvement in response times.',
    time: '9:15 AM',
    starred: false,
    read: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop'
  },
  {
    id: 3,
    from: 'ananya.patel@design.co',
    fromName: 'Ananya Patel',
    subject: 'New Design Mockups Ready',
    preview: 'I\'ve finished the mockups for the mobile app redesign...',
    body: 'I\'ve finished the mockups for the mobile app redesign. The new interface follows our updated design system and includes the accessibility improvements we discussed.',
    time: 'Yesterday',
    starred: false,
    read: true,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop'
  },
  {
    id: 4,
    from: 'notifications@analytics.com',
    fromName: 'Analytics Dashboard',
    subject: 'Weekly Performance Report',
    preview: 'Your weekly analytics summary is ready...',
    body: 'Your weekly analytics summary: 15,234 unique visitors, 45% bounce rate, average session duration 3m 42s. Traffic up 12% from last week.',
    time: 'Yesterday',
    starred: false,
    read: false,
    avatar: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=150&h=150&fit=crop'
  }
];

// Routes

// GET /api/emails - Get all emails
app.get('/api/emails', (req, res) => {
  res.json(emails);
});

// GET /api/emails/:id - Get single email
app.get('/api/emails/:id', (req, res) => {
  const email = emails.find(e => e.id === parseInt(req.params.id));
  if (!email) {
    return res.status(404).json({ message: 'Email not found' });
  }
  res.json(email);
});

// POST /api/emails - Send new email
app.post('/api/emails', (req, res) => {
  const { to, subject, body, cc, bcc } = req.body;

  if (!to || !subject || !body) {
    return res.status(400).json({ message: 'Missing required fields: to, subject, body' });
  }

  const newEmail = {
    id: Date.now(),
    from: 'you@email.com',
    fromName: 'You',
    to,
    subject,
    preview: body.substring(0, 50) + '...',
    body,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    starred: false,
    read: true,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop'
  };

  emails.unshift(newEmail); // Add to beginning of array
  res.status(201).json(newEmail);
});

// PUT /api/emails/:id/read - Mark email as read/unread
app.put('/api/emails/:id/read', (req, res) => {
  const email = emails.find(e => e.id === parseInt(req.params.id));
  if (!email) {
    return res.status(404).json({ message: 'Email not found' });
  }

  email.read = req.body.read !== undefined ? req.body.read : true;
  res.json(email);
});

// PUT /api/emails/:id/star - Star/unstar email
app.put('/api/emails/:id/star', (req, res) => {
  const email = emails.find(e => e.id === parseInt(req.params.id));
  if (!email) {
    return res.status(404).json({ message: 'Email not found' });
  }

  email.starred = req.body.starred !== undefined ? req.body.starred : !email.starred;
  res.json(email);
});

// DELETE /api/emails/:id - Delete email
app.delete('/api/emails/:id', (req, res) => {
  const emailIndex = emails.findIndex(e => e.id === parseInt(req.params.id));
  if (emailIndex === -1) {
    return res.status(404).json({ message: 'Email not found' });
  }

  emails.splice(emailIndex, 1);
  res.json({ message: 'Email deleted successfully' });
});

// POST /api/emails/simulate - Simulate receiving new email (for testing)
app.post('/api/emails/simulate', (req, res) => {
  const subjects = ['Meeting Reminder', 'Project Update', 'Quick Question', 'Follow-up'];
  const names = ['Amit Kumar', 'Priya Singh', 'Rajesh Gupta', 'Sneha Sharma'];

  const newEmail = {
    id: Date.now(),
    from: 'new@email.com',
    fromName: names[Math.floor(Math.random() * names.length)],
    subject: subjects[Math.floor(Math.random() * subjects.length)],
    preview: 'You have a new message...',
    body: 'This is a new incoming message.',
    time: 'Just now',
    starred: false,
    read: false,
    avatar: `https://images.unsplash.com/photo-${1500000000000 + Math.random() * 100000000000}?w=150&h=150&fit=crop`
  };

  emails.unshift(newEmail);
  res.status(201).json(newEmail);
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Email Service API running on port ${PORT}`);
  console.log(`API endpoints:`);
  console.log(`GET  /api/emails - Get all emails`);
  console.log(`GET  /api/emails/:id - Get single email`);
  console.log(`POST /api/emails - Send new email`);
  console.log(`PUT  /api/emails/:id/read - Mark as read/unread`);
  console.log(`PUT  /api/emails/:id/star - Star/unstar email`);
  console.log(`DELETE /api/emails/:id - Delete email`);
  console.log(`POST /api/emails/simulate - Simulate new email`);
  console.log(`GET  /api/health - Health check`);
});