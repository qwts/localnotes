#!/usr/bin/env node

import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];

function readContextFile(filename) {
  try {
    return readFileSync(join(ROOT, filename), 'utf8').replaceAll('\r\n', '\n');
  } catch (error) {
    errors.push(`${filename} could not be read: ${error.message}`);
    return '';
  }
}

const agents = readContextFile('AGENTS.md');
const claude = readContextFile('CLAUDE.md');

const START = '<!-- governed:shared-agent-discovery:start -->';
const END = '<!-- governed:shared-agent-discovery:end -->';
const REQUIRED_POINTERS = [
  'https://github.com/qwts/playbook-engineering/blob/main/docs/reference/agent-conventions.md',
  'https://github.com/qwts/playbook-engineering/blob/main/skills/README.md',
  'https://github.com/qwts/playbook-engineering/blob/main/docs/sop/README.md',
  'https://github.com/qwts/playbook-engineering/blob/main/docs/decisions/README.md',
];
const EXPECTED_CLAUDE = `# CLAUDE.md

Start with [AGENTS.md](AGENTS.md), the canonical repository context.

This adapter adds no Claude-specific rules.
`;

function occurrences(source, value) {
  return source.split(value).length - 1;
}

const start = agents.indexOf(START);
const end = agents.indexOf(END);
if (occurrences(agents, START) !== 1 || occurrences(agents, END) !== 1) {
  errors.push('AGENTS.md must contain exactly one marked shared discovery block');
}
if (start > end) {
  errors.push('AGENTS.md discovery markers are out of order');
}
const discovery = start !== -1 && end > start
  ? agents.slice(start, end + END.length)
  : '';
for (const pointer of REQUIRED_POINTERS) {
  if (occurrences(discovery, pointer) !== 1) {
    errors.push(`the marked discovery block must contain exactly one ${pointer}`);
  }
}
if (claude !== EXPECTED_CLAUDE) {
  errors.push('CLAUDE.md must remain the exact thin adapter onto AGENTS.md');
}

if (errors.length > 0) {
  process.stderr.write(`agent-context check failed:\n- ${errors.join('\n- ')}\n`);
  process.exit(1);
}

process.stdout.write('agent-context check passed\n');
