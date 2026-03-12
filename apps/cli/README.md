# Task Tracker CLI

A simple command-line task manager that stores tasks in a local JSON file.

## Requirements

- Node.js 18+
- [pnpm](https://pnpm.io/) (or npm/yarn)

## Setup

```bash
cd apps/cli
pnpm install
```

## Usage

```bash
npx tsx src/index.ts <command> [arguments]
```

### Commands

| Command | Description |
|---|---|
| `add <description>` | Add a new task |
| `update <id> <description>` | Update a task's description |
| `delete <id>` | Delete a task |
| `mark-in-progress <id>` | Mark a task as in-progress |
| `mark-done <id>` | Mark a task as done |
| `list` | List all tasks |
| `list todo` | List tasks with status todo |
| `list in-progress` | List tasks with status in-progress |
| `list done` | List tasks with status done |

### Examples

```bash
npx tsx src/index.ts add "Buy groceries"
# Task added (id: 1)

npx tsx src/index.ts add "Clean the house"
# Task added (id: 2)

npx tsx src/index.ts mark-in-progress 1
# Task 1 marked as in-progress

npx tsx src/index.ts list
# [1] Buy groceries (in-progress)
# [2] Clean the house (todo)

npx tsx src/index.ts mark-done 1
# Task 1 marked as done

npx tsx src/index.ts list done
# [1] Buy groceries (done)

npx tsx src/index.ts update 2 "Clean the entire house"
# Task 2 updated

npx tsx src/index.ts delete 2
# Task 2 deleted
```

## Storage

Tasks are saved in a `tasks.json` file in the directory where you run the command. The file is created automatically if it does not exist.
