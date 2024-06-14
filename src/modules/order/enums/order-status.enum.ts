export enum OrderStatus {
  PENDING = 'pending', // Pedido pendente (ainda não foi processado)
  CONFIRMED = 'confirmed', // Pedido confirmado (foi processado e está em preparo)
  IN_TRANSIT = 'in_transit', // Pedido em trânsito (foi coletado pelo entregador e está a caminho)
  DELIVERED = 'delivered', // Pedido entregue com sucesso
  CANCELED = 'canceled', // Pedido cancelado (não foi processado ou foi cancelado antes da entrega)
}
