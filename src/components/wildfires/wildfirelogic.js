// wildfireLogic.js

export function createWildfireState(cols, rows) {
  const grid = new Uint8Array(cols * rows);

  for (let i = 0; i < grid.length; i++) {
    grid[i] = 0                             // 1 = tree
  }

  const center = Math.floor((rows / 2) * cols + cols / 2);
  grid[center] = 2;

  return grid;
}

export function stepWildfire(grid, cols, rows, p = 0.01, f = 0.00001, p_regrow = 0.0001) {
  const next = new Uint8Array(cols * rows);

  const idx = (x, y) => y * cols + x;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const i = idx(x, y);
      const state = grid[i];

      if (state === 0) {
        // empty → grow tree based on probability p
        next[i] = Math.random() < p ? 1 : 0;

      } else if (state === 1) {
        // tree → burning? get neighbors
        const neighbors = [
          [x+1, y], [x-1, y],
          [x, y+1], [x, y-1]
        ];

        // run through neighbors to see if any are burning
        let burningNeighbor = false;
        for (const [nx, ny] of neighbors) {
          if (nx >= 0 && ny >= 0 && nx < cols && ny < rows) {
            if (grid[idx(nx, ny)] === 2) {
              burningNeighbor = true;
              break;
            }
          }
        }

        // spontaneous combustion/ignition based on probability f
        next[i] = burningNeighbor || Math.random() < f ? 2 : 1;

      } else if (state === 2) {
        // burning → burnt
        next[i] = 3;

      } else if (state === 3) {
        next[i] = Math.random() < p ? 1 : 3 // burnt → empty or grow tree
      }
    }
  }

  return next;
}
