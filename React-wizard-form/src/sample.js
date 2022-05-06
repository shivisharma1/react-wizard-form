import React, { useState } from "react";
import { Stepper, Step } from "react-form-stepper";
import { MdDescription } from "react-icons/md";
import StepWizard from "react-step-wizard";
import { Row, Col, Button, FormGroup, Label, Input } from "reactstrap";
import "./styles.css";
import Web3 from 'web3';
import abiArray from '../src/abi/escrowabi.json'
import busdAbiArray from '../src/abi/busdabi.json'




const ActionButtons = (props) => {

  const handleBack = () => {
    props.previousStep();
  };

  const Deal = () => {
    createDeal();
    //  props.nextStep();
  };

  const handleNext = () => {
    props.nextStep(); 
  };

  const handleFinish = () => {
    props.lastStep();
  };

  var contractAddress = "0x302E855d01cC6a20F202b8DdB4878F85742E3e05";
  var contractAddress1 = "0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee";
  const web3 = new Web3(window.ethereum);

  var myContract1 = new web3.eth.Contract(busdAbiArray, contractAddress1, {
    from: '0x3721430091076C0be6e96CE17E7DC22A2e173b57', // default from address
  });
  console.log(myContract1);

  var myContract = new web3.eth.Contract(abiArray, contractAddress, {
    from: '0x3721430091076C0be6e96CE17E7DC22A2e173b57', // default from address
  });
  console.log(myContract);

   // Read Contract Information - Contract Owner
   myContract.methods.contractOwner().call({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'})
  .then(console.log)
  

  async function createDeal(){
    const accounts = await web3.eth.getAccounts();
    //using the callback
    myContract.methods.createDeal('0x91ca770c261772DDAaFc2FA477527C5191f5Be53').send({from: accounts[0]}, function(error, transactionHash){
      console.log(transactionHash);
    //  document.getElementsByName('transactionhash'[0].value) = transactionHash;
    
    }); 

    myContract1.methods.transfer('0x91ca770c261772DDAaFc2FA477527C5191f5Be53',1000000000000000).send({from: accounts[0]}, function(error, transactionHash){
      console.log(transactionHash);
    });
  }

  return (
    <div>
      <Row>
        {props.currentStep > 1 && (
          <Col>
          <Button onClick={handleBack}>Back</Button>
          </Col>
        )}
        <Col>
        
          {props.currentStep < props.totalSteps && (
            <Button onClick={handleNext}>Next</Button>
           )} 
          {(
            <Button onClick={Deal}>Make Transaction</Button>
          )}

          {props.currentStep === props.totalSteps && (
            <Button onClick={handleFinish}>Finish</Button>
          )}
        </Col>
      </Row>
      
    </div>
  );
};





const One = (props) => {

  const [info1, setInfo1] = useState({});
  const [error, setError] = useState("");
  const [infodes, setInfodes] = useState({});
  const [infoamount, setInfoamount] = useState({});

  
  

  const onInputChanged = (event) => {
    const targetName = event.target.name;
    const targetValue = event.target.value;
    const targetDescription = event.target.name;
    const targetDescriptionValue1 = event.target.value;
    const targetAmount = event.target.name;
    const targetAmountValue = event.target.value;

  
    setInfo1((info1) => ({
      ...info1,
      [targetName]: targetValue
    }));


    setInfodes((infodes) => ({
      ...infodes,
      [targetDescription]: targetDescriptionValue1
    }));


    setInfoamount((infoamount) => ({
      ...infoamount,
      [targetAmount]: targetAmountValue
    }));
};

  const validate = () => {
    if (!info1.name || !infodes.description || !infoamount.usdt ) setError("Please fill all the fields");
    else {
      setError("");
      props.nextStep();
      props.userCallback(info1);
    }
  };


  return (
    <div>
      <span style={{ color: "red" }}>{error}</span>
      <h1>ESCROW</h1>
      <FormGroup>
      
      <div >
      <Label>Title:</Label></div>
        <Input 
          type="text"
          name="name"
          placeholder="Enter Title"
          onChange={onInputChanged}
        />
  
      <div > 
      <Label>Description:</Label></div>
      <Input 
          type="text"
          name="description"
          placeholder="Enter Description"
          onChange={onInputChanged}
        />

        <div > 
        <Label id='amountusd'>Amount USDT:</Label></div>
        <Input 
          type="number"
          name="usdt"
          placeholder="Enter Amount"
          onChange={onInputChanged}
        /> 

          <div > 
          <Label id='transactionhash'>Transaction Hash:</Label></div>
          <Input 
          type="text"
          name="transactionhash"
          placeholder="Transaction Hash"
          onChange={onInputChanged}
        /> 
      
      </FormGroup>
      <br />
      <ActionButtons {...props} nextStep={validate} />
      

    </div>
  );
  }








const Two = (props) => {
  const [info2, setInfo2] = useState({});
  const [error, setError] = useState(" ");

  const onInputChanged = (event) => {
    const targetName = event.target.name;
    const targetValue = event.target.value;

    setInfo2((info2) => ({
      ...info2,
      [targetName]: targetValue
    }));
  };

  const validate2 = () => {
    if (!info2.age) setError("Age is mandatory field");
    else {
      setError("");
      props.nextStep();
      props.userCallback(info2);
    }
  };

  return (
    <div>
      <span style={{ color: "red" }}>{error}</span>
      <h1>This is step 2 content</h1>
      <FormGroup>
        <Label>
          Deal Title: <b>{props.user.name}</b> <br></br><br></br>
          Deal Description: <b>{props.user.description}</b><br></br><br></br>
          Deal Amount: <b>{props.user.usdt + " USTD"}</b><br></br><br></br>
        </Label>

      </FormGroup>
      <FormGroup>
        <Label>Age: </Label>
        <Input
          type="text"
          name="age"
          placeholder="Enter your age"
          onChange={onInputChanged}
        />
      </FormGroup>
      <br />
      <ActionButtons {...props} nextStep={validate2} />
    </div>
  );
};

const Three = (props) => {
  console.log("step3 receive user object");
  console.log(props.user);

  const handleLastStep = () => {
    props.lastStep();
    props.completeCallback();
  };

  return (
    <div>
      <h2>Summary user detail</h2>
      <p>Name: {props.user.name}</p>
      <p>Age: {props.user.age}</p>
      <br />
      <ActionButtons {...props} lastStep={handleLastStep} />
    </div>
  );
};

const Sample = () => {
  const [stepWizard, setStepWizard] = useState(null);
  const [user, setUser] = useState({});
  const [activeStep, setActiveStep] = useState(0);

  const assignStepWizard = (instance) => {
    setStepWizard(instance);
  };

  const assignUser = (val) => {
    console.log("parent receive user callback");
    console.log(val);
    setUser((user) => ({
      ...user,
      ...val
    }));
  };

  const handleStepChange = (e) => {
    console.log("step change");
    console.log(e);
    setActiveStep(e.activeStep - 1);
  };

  const handleComplete = () => {
    alert("You r done. TQ");
  };

  return (
    <div>
      <Stepper activeStep={activeStep}>
        <Step label="Step 1" children={<MdDescription />} />
        <Step label="Personal Detail" />
        <Step label="Confirmation" />
      </Stepper>
      {/* NOTE: IMPORTANT !! StepWizard must contains at least 2 children components, else got error */}
      <StepWizard instance={assignStepWizard} onStepChange={handleStepChange}>
        <One userCallback={assignUser} />
        <Two user={user} userCallback={assignUser} />
        <Three user={user} completeCallback={handleComplete} />
      </StepWizard>
    </div>
  );
};

export default Sample;
