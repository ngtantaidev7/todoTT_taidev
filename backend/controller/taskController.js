import Task from '../models/Tasks.js';
export const getAllTasks = async (req, res) => {
  const { filter = 'today' } = req.query;
  const now = new Date();
  let startDate;
  switch (filter) {
    case 'today': {
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      break;
    }
    case 'week': {
      const mondayDate =
        now.getDate() - (now.getDay() - 1) - (now.getDay() === 0 ? 7 : 0);
      startDate = new Date(now.getFullYear(), now.getMonth(), mondayDate);
      break;
    }
    case 'month': {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    }
    case 'all':
    default: {
      startDate = null;
    }
  }

  const query = startDate ? { createdAt: { $gte: startDate } } : {};

  try {
    const result = await Task.aggregate([
      { $match: query },
      {
        $facet: {
          tasks: [{ $sort: { createAt: -1 } }],
          activeCount: [{ $match: { status: 'active' } }, { $count: 'count' }],
          completeCount: [
            { $match: { status: 'completed' } },
            { $count: 'count' },
          ],
        },
      },
    ]);
    const task = result[0].tasks;
    const activeCount = result[0].activeCount[0]?.count || 0;
    const completeCount = result[0].completeCount[0]?.count || 0;
    res.status(200).json({ task, activeCount, completeCount });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
export const createTask = async (req, res) => {
  try {
    const { title } = req.body; // du lieu tu client gui len
    const task = new Task({ title }); // tao doi tuong task moi
    const newTask = await task.save(); // luu vao database
    res.status(201).json(newTask); // thong bao tao thanh cong
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
export const updateTask = async (req, res) => {
  try {
    const { title, status, completedAt } = req.body;
    const updateTask = await Task.findByIdAndUpdate(
      req.params.id,
      { title, status, completedAt },
      { new: true }
    );
    if (!updateTask) {
      res.error(404).json({ message: 'Task not found' });
    }
    res.status(200).json(updateTask);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
export const deleteTask = async (req, res) => {
  try {
    const deleteTask = await Task.findByIdAndDelete(req.params.id);
    if (!deleteTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(204).json();
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
