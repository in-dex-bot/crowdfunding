<template>
  <v-app class="grey lighten-3">
    <v-content>
      <v-container>
        <v-layout
          text-xs-center
          wrap
        >
          <v-flex mb-4>
            <h2 class="" style=" margin-top: -24px; padding-top: 20px;">
               Transacciones sobre Ethereum testnet Ropsten
            </h2>
          </v-flex>
        </v-layout>

        <v-layout row justify-center>
          <v-dialog v-model="startProjectDialog" max-width="600px" persistent>
            <v-btn slot="activator" color="primary" dark>Generar un bloque</v-btn>
            <v-card>
              <v-card-title>
                <span class="headline font-weight-bold mt-2 ml-4">Genera un nuevo bloque</span>
              </v-card-title>
              <v-card-text class="pt-0">
                <v-container class="pt-0" grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12>
                      <v-text-field
                        label="Titulo"
                        persistent-hint
                        v-model="newProject.title">
                      </v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-textarea
                        label="Descripción"
                        persistent-hint
                        v-model="newProject.description">
                      </v-textarea>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <v-text-field
                        label="Cantidad requerida (ETH)"
                        type="number"
                        step="0.0001"
                        min="0"
                        v-model="newProject.amountGoal">
                      </v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <v-text-field
                        label="Duración (en dias)"
                        type="number"
                        v-model="newProject.duration">
                      </v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  flat
                  @click="startProjectDialog = false;
                  newProject.isLoading = false;">
                  Cerrar
                </v-btn>
                <v-btn color="blue darken-1"
                  flat
                  @click="startProject"
                  :loading="newProject.isLoading">
                  Generar un nuevo bloque
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-layout>
        
      </v-container>

      <v-container grid-list-lg>
        <hr/>
        <h2 class="" style="margin-top: -30px;"> Bloques generados a partir del contrato contenedor <b>0x15d88d19b7aab3fcbf9e721fd64f9de14c98c61b</b> </h2>
        
        <v-layout row wrap>
        
          
          <v-flex v-for="(project, index) in projectData" :key="index" xs12>
          
            <v-dialog v-model="project.dialog" width="800" >
              <v-card>
                <v-card-title class="headline font-weight-bold">
                  {{ project.projectTitle }}
                </v-card-title>
                <v-card-text>
                  {{ project.projectDesc }}
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    flat="flat"
                    @click="projectData[index].dialog = false"
                  >
                    Close
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>           
            
            
            
            <v-layout row justify-center>
               <v-dialog v-model="startFundDialog" max-width="600px" persistent>
                  <v-btn slot="activator" color="primary" dark>Generar una Txn sobre este contrato</v-btn>
                  <v-card>
                    <v-card-title>
                      <span class="headline font-weight-bold mt-2 ml-4">Aportar al contrato </span>
                      <span>   </span>
                    </v-card-title>
                    <v-card-text class="pt-0">
                      <v-container class="pt-0" grid-list-md>
                        <v-layout wrap>
                          <v-flex xs12 sm6>
                            <v-text-field
                              label="Contrato"
                              step="0.0001"
                              min="0"
                              v-model="newFund.contractToFund">
                            </v-text-field>
                          </v-flex>
                          <v-flex xs12>
                            <v-textarea
                              label="Descripción"
                              persistent-hint
                              v-model="newFund.desc">
                            </v-textarea>
                          </v-flex>
                          <v-flex xs12 sm6>
                            <v-text-field
                              label="Cantidad requerida (ETH)"
                              type="number"
                              step="0.0001"
                              min="0"
                              v-model="newFund.amountToFund">
                            </v-text-field>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        flat
                        @click="startFundDialog = false;
                        newFund.isLoading = false;">
                        Cerrar
                      </v-btn>
                      <v-btn color="blue darken-1"
                        flat
                        @click="startFund"
                        :loading="newFund.isLoading">
                        Aportar a este item
                      </v-btn>
                    </v-card-actions>               
                  </v-card>
                </v-dialog>
              </v-layout>  
            
            
            
            
            
            <v-hover>
              <v-card
                slot-scope="{ hover }"
                :class="`elevation-${hover ? 10 : 2}`"
              >
                <v-card-title primary-title>
                  <div>
                    <div class="headline font-weight-bold">
                      <v-chip
                        label
                        :color="stateMap[project.currentState].color"
                        text-color="white" class="mt-0">
                      {{ stateMap[project.currentState].text }}
                      </v-chip>
                      {{ project.projectTitle }}
                    </div>
                    <br/>
                     <span><b>Cuenta que crea el proyecto:</b> {{ project.projectStarter }} </span>
                    <br/>
                      <span><b>Contrato del proyecto:</b> {{ project.contract._address }}</span>
                    <br/><br/>
                    <span>{{ project.projectDesc.substring(0, 100) }}</span>
                    <span v-if="project.projectDesc.length > 100">
                      ... <a @click="projectData[index].dialog = true">[Show full]</a>
                    </span>
                    <br/><br/>
                    <small>Disponible hasta: <b>{{ new Date(project.deadline * 1000) }}</b></small>
                    <br/><br/>
                    <small>Meta: <b>{{ project.goalAmount / 10**18 }} ETH </b></small>
                    <small v-if="project.currentState == 1">wasn't achieved before deadline</small>
                    <small v-if="project.currentState == 2">has been achieved</small>
                  </div>
                </v-card-title>
                
                <v-flex
                  v-if="project.currentState == 0 && account != project.projectStarter"
                  class="d-flex ml-3" xs12 sm6 md3>
                  <v-text-field
                    label="Cantidad (en ETH)"
                    type="number"
                    step="0.0001"
                    min="0"
                    v-model="project.fundAmount"
                  ></v-text-field>
                                  
                  <v-btn
                    class="mt-3"
                    color="light-blue darken-1 white--text"
                    @click="fundProject(index)"
                    :loading="project.isLoading"
                  >
                    Pagar
                  </v-btn>
                </v-flex>
                
                <v-flex class="d-flex ml-3" xs12 sm6 md3>
                  <v-btn
                    class="mt-3"
                    color="amber darken-1 white--text"
                    v-if="project.currentState == 1"
                    @click="getRefund(index)"
                    :loading="project.isLoading"
                  >
                    Obtener reembolso (en ETH)
                  </v-btn>                            
                </v-flex>
                
                <v-card-actions v-if="project.currentState == 0" class="text-xs-center">
                  <span class="font-weight-bold" style="width: 200px;">
                    {{ project.currentAmount / 10**18 }} ETH
                  </span>
                  <v-progress-linear
                    height="10"
                    :color="stateMap[project.currentState].color"
                    :value="(project.currentAmount / project.goalAmount) * 100"
                  ></v-progress-linear>
                  <span class="font-weight-bold" style="width: 200px;">
                    {{ project.goalAmount / 10**18 }} ETH
                  </span>
                </v-card-actions>
                               
                
          <v-flex v-for="(fund, index) in fundData" :key="index" xs12>
            <v-dialog v-model="fund.dialog" width="800" >
                <v-card>
                  <v-card-title class="headline font-weight-bold">
                    {{ fund.fundDesc }}
                  </v-card-title>
                  <v-card-text>
                    {{ fund.fundDesc }}
                  </v-card-text>
                </v-card>
            </v-dialog>
            <v-hover v-if="fund.fundContractToFund == project.contract._address">
              <v-card
                slot-scope="{ hover }"
                :class="`elevation-${hover ? 10 : 2}`"
              >
                <v-card-title primary-title>
                  <div>
                    <div class="headline font-weight-bold">
                      <v-chip
                        label
                        :color="stateMap[fund.currentStateF].color"
                        text-color="white" class="mt-0">
                      {{ stateMap[fund.currentStateF].text }}
                      </v-chip>
                      {{ fund.fundDesc }}
                    </div>
                    <br/>
                    <span><b>Descripción:</b>{{ fund.fundDesc.substring(0, 100) }}</span><br>
                    <span><b>Cuenta origen:</b> {{ fund.fundStarter }} </span><br>
                    <span><b>Contrato recibe aporte:</b> {{ fund.fundContractToFund }} </span><br>
                    <span><b>Aporte: </b> {{ fund.goalAmountF }} ETH</span>
                    <span v-if="fund.fundDesc.length > 100">
                      ... <a @click="fundData[index].dialog = true">[Show full]</a>
                    </span>
                  </div>
                </v-card-title>
              </v-card>
            </v-hover>
          </v-flex>
                                                                                
                
                
              </v-card>
            </v-hover>
       
            
          </v-flex>
        </v-layout>      
        
        <v-layout
          text-xs-center
          wrap
        >
          <v-flex mb-4>                       
            <p class="subheading font-weight-regular"><hr/></p>
            <p>
             <a href="https://defimath.herokuapp.com" target="_blank">Calcúla el costo de las transacciones en Ethereum</a>
            </p>
          </v-flex>
        </v-layout> 
        
        <v-layout row justify-left>
          <v-dialog v-model="startProjectDialog2" max-width="1000px" persistent>
            <v-btn slot="activator" color="blue darken-1" dark>Generalidades</v-btn>                     
            <v-card>
              <v-card-title>
                <span class="headline font-weight-bold mt-2 ml-4">Generalidades</span>
              </v-card-title>
              <v-card-text class="pt-0">
                <v-container class="pt-0" grid-list-md>
                  <v-layout wrap>
                  
                   <p class="subheading font-weight-regular">
                    - Todo en Ethereum es una transacción, GET de bloques es gratis, Agregar un bloque cuesta Gas, No es posible modificar o borrar bloques.<br><br>
                    - Esta aplicación utiliza contratos inteligentes en Solidity para generar bloques sobre el blockchain de Ethereum<br><br> 
                    - Para realizar transacciones en una testnet (Mainnet es la red principal de Ethereum) se requiere una dirección blockchain (semejante a una cuenta de banco) y una billetera: 
                      Instalar una en tu navegador<a href="https://metamask.io" target="_blank">Metamask (Extension para Chrome o Firefox)</a> y solicita algunos Eths de prueba
                      en <a href="https://faucet.ropsten.be/" target="_blank">faucet.ropsten.be</a> para crear tu bloque o aportar a un contrato en la Testnet Ropsten. 
                      (Se puede obtener un ETH de prueba cada 24 horas desde la Ip del navegador).<br><br>
                    - En <a href="https://defimath.herokuapp.com" target="_blank">Calculadora para ETH</a> puedes calcular los costos de las transacciones.<br><br>
                    - Para comprar ETH real <a href="https://www.buda.com" target="_blank">Banco digital de criptoactivos</a> de una compañia llamada surBTC basada en Chile
                      (activa en Chile, Perú, Argentina y Colombia).<br><br>
                    - Para revisar las transacciones directamente en la cadena de bloques está 
                      <a href="https://ropsten.etherscan.io/address/0x15d88d19b7aab3fcbf9e721fd64f9de14c98c61b">
                      https://ropsten.etherscan.io/address/0x15d88D19b7aAB3Fcbf9e721Fd64f9de14C98c61B 
                      </a> (Este es el contrato contenedor generado en el deploy y al cual se agregan los demás bloques)<br><br>
                    - <a href="https://gobiernodigital.mintic.gov.co/692/articles-161810_Ley_2052_2020.pdf" target="_blank">Guía adopción de proyectos sobre Blockchain para Colombia</a>
                  </p>
            
                  </v-layout>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                
                <v-btn
                  color="blue darken-1" flat @click="startProjectDialog2 = false;">
                  Cerrar
                </v-btn>
                                        
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-layout>   
        
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
// We import our the scripts for the smart contract instantiation, and web3
import crowdfundInstance from '../contracts/crowdfundInstance';
import crowdfundProject from '../contracts/crowdfundProjectInstance';
import crowdfundFund from '../contracts/crowdfundFundInstance';
import web3 from '../contracts/web3';
export default {
  name: 'App',
  data() {
    return {
      startProjectDialog: false,
      startProjectDialog2: true,
      startFundDialog: false,
      account: null,
      stateMap: [
        { color: 'primary', text: 'En curso' },
        { color: 'warning', text: 'Expired' },
        { color: 'success', text: 'Completed' },
      ],
      projectData: [],
      fundData: [],
      newProject: { isLoading: false },
      newFund: { isLoading: false },
    };
  },
  mounted() {
    // this code snippet takes the account (wallet) that is currently active
    web3.eth.getAccounts().then((accounts) => {
      [this.account] = accounts;
      this.getProjects();
      this.getFunds();
    });
  },
  methods: {
    getProjects() {
      crowdfundInstance.methods.returnAllProjects().call().then((projects) => {
        projects.forEach((projectAddress) => {
          const projectInst = crowdfundProject(projectAddress);
          projectInst.methods.getDetails().call().then((projectData) => {
            const projectInfo = projectData;
            projectInfo.isLoading = false;
            projectInfo.contract = projectInst;
            this.projectData.push(projectInfo);
          });
        });
      });
    },
    startProject() {
      this.newProject.isLoading = true;
      crowdfundInstance.methods.startProject(
        this.newProject.title,
        this.newProject.description,
        this.newProject.duration,
        web3.utils.toWei(this.newProject.amountGoal, 'ether'),
      ).send({
        from: this.account,
      }).then((res) => {
        const projectInfo = res.events.ProjectStarted.returnValues;
        projectInfo.isLoading = false;
        projectInfo.currentAmount = 0;
        projectInfo.currentState = 0;
        projectInfo.contract = crowdfundProject(projectInfo.contractAddress);
        console.log(projectInfo.contract._address);
        this.startProjectDialog = false;
        this.newProject = { isLoading: false };
      });
    },
    fundProject(index) {
      if (!this.projectData[index].fundAmount) {
        return;
      }
      const projectContract = this.projectData[index].contract;
      this.projectData[index].isLoading = true;
      projectContract.methods.contribute().send({
        from   : this.account,
        value  : web3.utils.toWei(this.projectData[index].fundAmount, 'ether')
      }).then((res) => {
        const newTotal = parseInt(res.events.FundingReceived.returnValues.currentTotal, 10);
        const projectGoal = parseInt(this.projectData[index].goalAmount, 10);
        this.projectData[index].currentAmount = newTotal;
        this.projectData[index].isLoading = false;
        // Set project state to success
        if (newTotal >= projectGoal) {
          this.projectData[index].currentState = 2;
        }
      });
    },
    
    startFund() {
      this.newFund.isLoading = true;
      crowdfundInstance.methods.startFund(  // porque startFund es un método de la instancia crowdfunding
        this.newFund.contractToFund,
        this.newFund.desc,
        web3.utils.toWei(this.newFund.amountToFund, 'ether'),
      ).send({
        from: this.account,
      }).then((res) => {
        const fundInfo = res.events.FundStarted.returnValues;
        fundInfo.isLoading = false;
        fundInfo.currentAmount = 0;
        fundInfo.currentState = 0;
        fundInfo.contract = crowdfundFund(fundInfo.contractAddress);
        this.startFundDialog = false;
        this.newFund = { isLoading: false };
      });
    },
    
    getFunds() {
      crowdfundInstance.methods.returnAllFunds().call().then((funds) => {
        funds.forEach((fundAddress) => {
          const fundInst = crowdfundFund(fundAddress);
          fundInst.methods.getDetailsF().call().then((fundData) => {
            const fundInfo = fundData;
            fundInfo.isLoading = false;
            fundInfo.contract = fundInst;
            this.fundData.push(fundInfo);
          });
        });
      });
    },
    
    getRefund(index) {
      this.projectData[index].isLoading = true;
      this.projectData[index].contract.methods.getRefund().send({
        from: this.account,
      }).then(() => {
        this.projectData[index].isLoading = false;
      });
    },
  },
};
</script>
