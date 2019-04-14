## Checks-Effects-Interaction Pattern
When we are handing over the control, it’s crucial that the current contract has finished its functionality and does not depend on the execution of the other contract. This way the contract can't be taken into infinit loop of calls, which transfer more than the user should take.

## Circuit Breaker
An emergency stop, which can be used to stop the contract, if breach is present.

## Library Driven
Helps the code reusability and making the contracts more understandable.