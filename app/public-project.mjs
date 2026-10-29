/** A published portfolio entry never grants access to the client's private project. */
export function toPublicProject(row) {
  return {
    id: row.id, title: row.title, type: row.type, description: row.description,
    imageUrl: row.imageUrl, websiteUrl: row.websiteUrl, updatedAt: row.updatedAt,
  };
}
