import { spawnSync } from "node:child_process";

const commands = [
  {
    name: "Limpeza do banco de dados",
    command: "npm",
    args: ["run", "test:db:clean"],
  },
  {
    name: "Seed do banco de dados",
    command: "npm",
    args: ["run", "db:seed"],
  },
  {
    name: "Testes unitários",
    command: "npm",
    args: ["test"],
  },
];

for (const step of commands) {
  console.log("\n========================================");
  console.log(`  ${step.name}`);
  console.log("========================================\n");

  const result = spawnSync(step.command, step.args, {
    stdio: "inherit",
    shell: true,
  });

  if (result.status !== 0) {
    console.error(`\n❌ Falha em: ${step.name}`);
    process.exit(result.status ?? 1);
  }
}

console.log("\n========================================");
console.log("  ✅ Testes finalizados com sucesso!");
console.log("========================================\n");