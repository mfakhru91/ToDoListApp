export type NavigationParamsList = {
    DashboardScreen:undefined,
    ItemListScreen:{activity:DetailActivity}
}

type DetailActivity = {
    "created_at": string
    "id": number
    "title": string, 
    "todo_items": any[]
}