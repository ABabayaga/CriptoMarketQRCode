"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { useEffect, useState } from "react";
import { Container, Card, Row, Col, Table, Spinner } from "react-bootstrap";

type DashboardData = {
  totalReceived: string;
  monitorActive: boolean;
  lastPayment: {
    amount: string;
    from: string;
    timestamp: number;
  } | null;
  recentPayments: {
    amount: string;
    from: string;
    timestamp: number;
  }[];
};

export default function HomePage() {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        //Banco local
        /*const res = await fetch("http://localhost:5000/api/dashboard");*/
        //Banco Mongo Atlas
        const res = await fetch("https://criptomarketqrcode.onrender.com/api/dashboard");
        const data = await res.json();
        setDashboard(data);
      } catch (err) {
        console.error("Erro ao carregar dashboard:", err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  function formatTimestamp(unix: number) {
    const date = new Date(unix * 1000);
    return date.toLocaleString("pt-BR");
  }

  return (
    <DashboardLayout>
      <Container className="mt-4">
        <h2>📊 Visão Geral do Comércio</h2>

        {loading ? (
          <div className="text-center mt-5">
            <Spinner animation="border" />
            <p>Carregando dados do dashboard...</p>
          </div>
        ) : (
          dashboard && (
            <>
              <Row className="mb-4">
                <Col>
                  <Card>
                    <Card.Body>
                      <Card.Title>Total Recebido</Card.Title>
                      <Card.Text className="fs-3 text-success">
                        {dashboard.totalReceived} BNB
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Card>
                    <Card.Body>
                      <Card.Title>Último Pagamento</Card.Title>
                      {dashboard.lastPayment ? (
                        <>
                          <p>💸 {dashboard.lastPayment.amount} BNB</p>
                          <p>👤 {dashboard.lastPayment.from}</p>
                          <p>🕒 {formatTimestamp(dashboard.lastPayment.timestamp)}</p>
                        </>
                      ) : (
                        <p>Nenhum pagamento ainda</p>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Card>
                    <Card.Body>
                      <Card.Title>Status do Monitor</Card.Title>
                      <p
                        className={`fw-bold ${
                          dashboard.monitorActive ? "text-success" : "text-danger"
                        }`}
                      >
                        {dashboard.monitorActive ? "Ativo" : "Inativo"}
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              <Card>
                <Card.Body>
                  <Card.Title>📄 Últimos Pagamentos</Card.Title>
                  {dashboard.recentPayments.length === 0 ? (
                    <p>Nenhum pagamento recente encontrado.</p>
                  ) : (
                    <Table striped hover responsive>
                      <thead>
                        <tr>
                          <th>Valor</th>
                          <th>Pagador</th>
                          <th>Data/Hora</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dashboard.recentPayments.map((p: any, idx: number) => (
                          <tr key={idx}>
                            <td>{p.amount} BNB</td>
                            <td>{p.from}</td>
                            <td>{formatTimestamp(p.timestamp)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  )}
                </Card.Body>
              </Card>
            </>
          )
        )}
      </Container>
    </DashboardLayout>
  );
}
