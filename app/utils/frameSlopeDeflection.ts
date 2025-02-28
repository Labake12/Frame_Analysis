import { Beam, Column } from "../types";

export interface FrameSlopeDeflectionEquation {
  memberLabel: string;
  startEquation: string;
  endEquation: string;
}

export const generateFrameSlopeDeflectionEquations = (
  columns: Column[],
  beams: Beam[],
  fixedEndMoments: {
    label: string;
    start: number;
    end: number;
  }[]
): FrameSlopeDeflectionEquation[] => {
  const equations: FrameSlopeDeflectionEquation[] = [];

  // Process columns
  columns.forEach((column, index) => {
    const columnLabel = `C${index + 1}`;
    const fem = fixedEndMoments.find((m) => m.label === `Column ${index + 1}`);

    // Skip if support type is hinged or roller
    if (column.supportType === "hinged") {
      equations.push({
        memberLabel: columnLabel,
        startEquation: "0",
        endEquation: "0",
      });
      return;
    }

    const { length: L, momentOfInertia: I } = column;
    const baseCoefficient = Number((2 / L).toFixed(4));
    const deltaCoeff = Number((3 / L).toFixed(4));

    // Start equation
    let startEquation = "";
    const femStart = fem?.start || 0;
    if (femStart !== 0) {
      startEquation = `${femStart.toFixed(4)}`;
    }

    // For first column (C1)
    if (index === 0) {
      if (column.supportType === "fixed") {
        // If fixed, θA = 0, only include θB term
        startEquation += startEquation
          ? ` + ${(baseCoefficient * I).toFixed(4)}EIθB`
          : `${(baseCoefficient * I).toFixed(4)}EIθB`;
      } else {
        // Include both θA and θB terms
        startEquation += startEquation
          ? ` + ${(2 * baseCoefficient * I).toFixed(4)}EIθA + ${(
              baseCoefficient * I
            ).toFixed(4)}EIθB`
          : `${(2 * baseCoefficient * I).toFixed(4)}EIθA + ${(
              baseCoefficient * I
            ).toFixed(4)}EIθB`;
      }
    }
    // For second column (C2)
    else if (index === 1) {
      if (column.supportType === "fixed") {
        // If fixed, θD = 0, only include θC term
        startEquation += startEquation
          ? ` + ${(2 * baseCoefficient * I).toFixed(4)}EIθC`
          : `${(2 * baseCoefficient * I).toFixed(4)}EIθC`;
      } else {
        // Include both θC and θD terms
        startEquation += startEquation
          ? ` + ${(2 * baseCoefficient * I).toFixed(4)}EIθC + ${(
              baseCoefficient * I
            ).toFixed(4)}EIθD`
          : `${(2 * baseCoefficient * I).toFixed(4)}EIθC + ${(
              baseCoefficient * I
            ).toFixed(4)}EIθD`;
      }
    }
    startEquation += ` - ${(baseCoefficient * deltaCoeff * I).toFixed(4)}EIδ`;

    // End equation
    let endEquation = "";
    const femEnd = fem?.end || 0;
    if (femEnd !== 0) {
      endEquation = `${femEnd.toFixed(4)}`;
    }

    // For first column (C1)
    if (index === 0) {
      if (column.supportType === "fixed") {
        // If fixed, θA = 0, only include θB term
        endEquation += endEquation
          ? ` + ${(2 * baseCoefficient * I).toFixed(4)}EIθB`
          : `${(2 * baseCoefficient * I).toFixed(4)}EIθB`;
      } else {
        // Include both θA and θB terms
        endEquation += endEquation
          ? ` + ${(baseCoefficient * I).toFixed(4)}EIθA + ${(
              2 *
              baseCoefficient *
              I
            ).toFixed(4)}EIθB`
          : `${(baseCoefficient * I).toFixed(4)}EIθA + ${(
              2 *
              baseCoefficient *
              I
            ).toFixed(4)}EIθB`;
      }
    }
    // For second column (C2)
    else if (index === 1) {
      if (column.supportType === "fixed") {
        // If fixed, θD = 0, only include θC term
        endEquation += endEquation
          ? ` + ${(baseCoefficient * I).toFixed(4)}EIθC`
          : `${(baseCoefficient * I).toFixed(4)}EIθC`;
      } else {
        // Include both θC and θD terms
        endEquation += endEquation
          ? ` + ${(baseCoefficient * I).toFixed(4)}EIθC + ${(
              2 *
              baseCoefficient *
              I
            ).toFixed(4)}EIθD`
          : `${(baseCoefficient * I).toFixed(4)}EIθC + ${(
              2 *
              baseCoefficient *
              I
            ).toFixed(4)}EIθD`;
      }
    }
    endEquation += ` - ${(baseCoefficient * deltaCoeff * I).toFixed(4)}EIδ`;

    equations.push({
      memberLabel: columnLabel,
      startEquation,
      endEquation,
    });
  });

  // Process beams
  beams.forEach((beam, index) => {
    // Update labeling to use BC for beam between columns
    const beamLabel = `BC`;
    const fem = fixedEndMoments.find((m) => m.label === `Beam ${index + 1}`);

    const { length: L, momentOfInertia: I } = beam;
    const baseCoefficient = Number((2 / L).toFixed(4));

    // Start equation (MB)
    let startEquation = "";
    const femStart = fem?.start || 0;
    if (femStart !== 0) {
      startEquation = `${femStart.toFixed(4)}`;
    }

    // MB = FEMb + 2/L * EI * (2θB + θC)
    startEquation += startEquation
      ? ` + ${(2 * baseCoefficient * I).toFixed(4)}EIθB + ${(
          baseCoefficient * I
        ).toFixed(4)}EIθC`
      : `${(2 * baseCoefficient * I).toFixed(4)}EIθB + ${(
          baseCoefficient * I
        ).toFixed(4)}EIθC`;

    // End equation (MC)
    let endEquation = "";
    const femEnd = fem?.end || 0;
    if (femEnd !== 0) {
      endEquation = `${femEnd.toFixed(4)}`;
    }

    // MC = FEMb + 2/L * EI * (θB + 2θC)
    endEquation += endEquation
      ? ` + ${(baseCoefficient * I).toFixed(4)}EIθB + ${(
          2 *
          baseCoefficient *
          I
        ).toFixed(2)}EIθC`
      : `${(baseCoefficient * I).toFixed(4)}EIθB + ${(
          2 *
          baseCoefficient *
          I
        ).toFixed(4)}EIθC`;

    equations.push({
      memberLabel: beamLabel,
      startEquation,
      endEquation,
    });
  });

  return equations;
};
