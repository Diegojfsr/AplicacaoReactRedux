package BancoDigitalJava;

public class Main {

	public static void main(String[] args) {
		
		Cliente Camille = new Cliente();
		Camille.setNome("Camille");
		
		Conta corrente = new ContaCorrente(Camille);
		corrente.depositar(100);
		
		
		Conta poupanca = new ContaPoupanca(Camille);
		corrente.transferir(50, poupanca);

		corrente.imprimirExtrato();
		poupanca.imprimirExtrato();
		
	}

}
