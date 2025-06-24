<script setup>
import CircuitOne from '../assets/circuit/001-01.svg';
import CircuitTwo from '../assets/circuit/001-02.svg';
import CircuitThree from '../assets/circuit/001-03.svg';
import CircuitFour from '../assets/circuit/001-04.svg';
</script>

<template>
  <div class="circuit-svgs absolute left-0 top-0 w-full h-44 overflow-hidden">
    <div id="cont-1">
      <circuitOne class="circuit-svg circuit-svg-1" />
    </div>
    <div id="cont-2" class="mt-[-50px] w-3/12 md:w-6/12 flex justify-center">
      <CircuitTwo class="circuit-svg circuit-svg-2 w-[100px] h-[150px]" />
    </div>
    <div id="cont-3" class="mb-[-50px] md:mb-[-150px] w-3/12 md:w-6/12 flex justify-center">
      <CircuitThree class="circuit-svg circuit-svg-3 w-[93px] h-[150px]" />
    </div>
    <div id="cont-4" class="mb-[-50px] md:mb-[-150px] w-3/12 md:w-6/12 flex justify-center">
      <CircuitFour class="circuit-svg circuit-svg-4 w-[178px] h-[150px]" />
    </div>
  </div>
</template>

<style>

.circuit-svgs #cont-1 {
  display: block;
}


@media (min-width: 1024px) {

}

@media (min-width: 1280px) {

}



.circuit-svgs #cont-2,
.circuit-svgs #cont-3,
.circuit-svgs #cont-4 {
  display: none;
}

</style>
