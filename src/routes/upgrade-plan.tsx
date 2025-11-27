import { Title } from "@solidjs/meta";
import { JSX } from "solid-js";
import { createStore } from "solid-js/store";
import UpgradePlan from "../components/plan/UpgradePlan";

export default function UpgradePlanPage() {
  return (
    <>
      <Title>Upgrade Plan</Title>
      <UpgradePlan />
    </>
  );
}
