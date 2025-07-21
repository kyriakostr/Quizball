import categoryPlaysAnimationMap from "@/types/category-plays-animation.map";
import { Category } from "@/types/category.enum";
import { Difficulty } from "@/types/difficulty.enum";
import { QuestionOption } from "@/types/question-option.type";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type CategoryRowProps = {
  category: Category;
  questions: QuestionOption[];
  onPointSelect: (difficulty: Difficulty) => void;
  disabled?: boolean;
};

export default function CategoryRow({
  category,
  questions,
  onPointSelect,
  disabled = false,
}: CategoryRowProps) {
  const categoryInfo = categoryPlaysAnimationMap[category];

  const questionsByDifficulty = questions.reduce((acc, question) => {
    if (!acc[question.difficulty]) {
      acc[question.difficulty] = [];
    }
    acc[question.difficulty].push(question);
    return acc;
  }, {} as Record<Difficulty, QuestionOption[]>);

  return (
    <View style={styles.container}>
      <View
        style={[styles.categoryButton, { backgroundColor: categoryInfo.color }]}
      >
        <View style={styles.categoryContent}>
          <View style={styles.iconContainer}>{/* Icon will go here */}</View>
          <Text style={styles.categoryText}>{categoryInfo.text}</Text>
        </View>

        <View style={styles.pointsContainer}>
          {Object.values(Difficulty).map((difficulty) => {
            const availableQuestions =
              questionsByDifficulty[difficulty]?.filter((q) => q.isAvailable) ||
              [];
            const totalQuestions =
              questionsByDifficulty[difficulty]?.length || 0;
            const availableCount = availableQuestions.length;
            const isDisabled = availableCount < totalQuestions || disabled;

            return (
              <TouchableOpacity
                key={difficulty}
                style={[
                  styles.pointButton,
                  { backgroundColor: categoryInfo.color },
                  isDisabled && styles.disabledButton,
                ]}
                onPress={() => onPointSelect(difficulty)}
                disabled={isDisabled}
              >
                {isDisabled ? (
                  <Text style={styles.disabledText}>✕</Text>
                ) : (
                  <Text style={styles.pointText}>{difficulty}</Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    width: "100%", 
  },
  categoryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    height: 80,
    width: "100%",
  },
  categoryContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-start",
  },
  iconContainer: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  categoryText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
  },
  pointsContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  pointButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "white",
  },
  pointText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  disabledButton: {
    opacity: 0.7,
    backgroundColor: "#ff4444", // Red background for unavailable
  },
  disabledText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
