import { test } from "node:test";
import assert from "node:assert/strict";
import { roastColor, roastStage, ROAST_STOPS } from "../src/roast-color.ts";

test("bean colour runs from green to dark roast and clamps outside the scene", () => {
  assert.equal(roastColor(0), ROAST_STOPS[0]);
  assert.equal(roastColor(1), ROAST_STOPS.at(-1));
  assert.equal(roastColor(-2), ROAST_STOPS[0]);
  assert.equal(roastColor(3), ROAST_STOPS.at(-1));
  assert.equal(roastColor(0.25), ROAST_STOPS[1]);
  assert.match(roastColor(0.6), /^#[0-9a-f]{6}$/);
});

test("stage label follows the scroll progress", () => {
  assert.equal(roastStage(0), "Verde");
  assert.equal(roastStage(0.3), "Amarelo");
  assert.equal(roastStage(0.6), "Canela");
  assert.equal(roastStage(1), "Chocolate");
});
