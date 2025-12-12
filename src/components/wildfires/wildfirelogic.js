export function createWildfireState(cols, rows, treeDensity) {
  const grid = new Array(rows);

  for (let y = 0; y < rows; y++) {
    grid[y] = new Array(cols);
    for (let x = 0; x < cols; x++) {
      if (Math.random()/10 < treeDensity) {
        grid[y][x] = {
          fuel: 1.0 + Math.random() * 2.0,
          temperature: 0.0,
          burning: false,
          moisture: 0.2 + Math.random() * 0.6,
          burnedOut: false,
        };
      } else {
        grid[y][x] = {
          fuel: 0.0,
          temperature: 0.0,
          burning: false,
          moisture: 0.0,
          burnedOut: false,
        }
      }
    } 
  }
  return grid;
}

export function stepWildfire(grid, cols, rows, params) {
  const { lightningProb, treeDensity } = params;

  const next = new Array(rows);

  const ignitionTemp = 0.8;
  const heatTransfer = 0.2;
  const coolRate = 0.02;
  const burn_rate = 0.08;

  for (let y = 0; y < rows; y++) {
    next[y] = new Array(cols);

    for (let x = 0; x < cols; x++) {
      const cell = grid[y][x];
      const updated = { ...cell };

      if (cell.fuel <= 0) {
        updated.fuel = 0;
        updated.temperature = 0;
        updated.burning = false;
        next[y][x] = updated;
        continue;
      }

      // cool naturally
      updated.temperature = Math.max(0, updated.temperature - coolRate);

      // lightning strike
      if (!cell.burning && Math.random() < lightningProb) {
        updated.burning = true;
      }

      if (!updated.burning) {
        let heatFromNeighbors = 0;

        const neighbors = [
          [-1, -1, Math.SQRT2], [0, -1, 1], [1, -1, Math.SQRT2],
          [-1,  0, 1],                    [1,  0, 1],
          [-1,  1, Math.SQRT2], [0,  1, 1], [1,  1, Math.SQRT2]
        ];

        for (const [dx, dy, dist] of neighbors) {
          const nx = x + dx;
          const ny = y + dy;

          if (nx >= 0 && nx < cols && ny >= 0 && ny < rows) {
            const neighbor = grid[ny][nx];
            if (neighbor.burning) {
              const weight = heatTransfer / dist;
              heatFromNeighbors += neighbor.temperature * weight;
            }
          }
        }

        // apply heat
        updated.temperature += heatFromNeighbors;

        // ignition check
        if (updated.temperature >= ignitionTemp) {
          updated.burning = true;
        }
      }

      // burning cell consumes fuel
      if (updated.burning) {
        const moistureFactor = 1 - updated.moisture;

        updated.fuel = Math.max(0, updated.fuel - burn_rate * moistureFactor);
        updated.temperature = 1.0;

        if (updated.fuel <= 0) {
          updated.burning = false;
          updated.burnedOut = true;
        }
      }

      next[y][x] = updated;
    }
  }

  return next;
}
