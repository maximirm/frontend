<template>
  <StyledCard
      @click="selectQuestion"
      :class="{ 'selected': isSelected }">
    <InfoPair
        :label="'Fragestellung:'"
        :value="question.question_text"/>
    <InfoPair
        :label="'Art:'"
        :value="questionTypeText"/>
    <InfoPair
        :value="question.responses.length + ' Antworten'"/>
  </StyledCard>
</template>

<script>
import InfoPair from "@/components/general/InfoPair.vue";
import StyledCard from "@/components/general/StyledCard.vue";

export default {
  name: 'QuestionCard',
  components: {StyledCard, InfoPair},
  props: {
    question: {
      type: Object,
      required: true,
    },
    isSelected: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    questionTypeText() {
      if (this.question.type === 1) {
        return "Freitext";
      } else if (this.question.type === 2) {
        return "Dropdown";
      } else if (this.question.type === 3) {
        return "Checkbox";
      } else {
        return "Unbekannt";
      }
    },
    formattedOptions() {
      return this.question.options.slice(0, 3).map((option, index) => {
        return `${index + 1}. ${option}`;
      }).join(', ');
    },
  },
  methods: {
    selectQuestion() {
      this.$emit('questionSelected', this.question);
    },
  }
};
</script>

<style scoped>

.key-value-pair p {
  margin: 1px 0;
  padding: 2px;
  color: #ccc;
  text-overflow: ellipsis;
}

.question-item {
  border: 2px solid #666;
  padding: 5px;
  transition: border-color 0.3s;
  display: flex;
  justify-content: flex-start;
}

.key-value-pair {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 5px;
  width: 200px;
}

.selected-question {
  background-color: #2e2e2e;
  color: #4CAF50;
  border-left: 4px solid #4CAF50;
}

</style>
