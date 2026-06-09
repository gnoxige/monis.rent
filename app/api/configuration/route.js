import { ACCESSORIES, buildConfiguration, CHAIRS, DESKS } from "@/lib/catalog";

function validId(collection, id) {
  return id == null || collection.some((item) => item.id === id);
}

export async function GET() {
  return Response.json({
    ok: true,
    catalog: {
      desks: DESKS,
      chairs: CHAIRS,
      accessories: ACCESSORIES
    }
  });
}

export async function POST(request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body !== "object") {
    return Response.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const { deskId = null, chairId = null, acc = {} } = body;

  if (!validId(DESKS, deskId) || !validId(CHAIRS, chairId)) {
    return Response.json({ ok: false, error: "Invalid desk or chair selection." }, { status: 400 });
  }

  const invalidAccessory = Object.keys(acc).find(
    (id) => !ACCESSORIES.some((item) => item.id === id) || typeof acc[id] !== "boolean"
  );

  if (invalidAccessory) {
    return Response.json({ ok: false, error: `Invalid accessory selection: ${invalidAccessory}` }, { status: 400 });
  }

  const configuration = buildConfiguration({ deskId, chairId, acc });

  return Response.json({
    ok: true,
    configuration
  });
}
