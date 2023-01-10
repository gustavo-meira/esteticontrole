export const FormsCreateClient = () => (
  <form>
    <div>
      <label htmlFor="name">Nome</label>
      <input type="text" name="name" id="name" />
    </div>
    <div>
      <label htmlFor="birthDate">Data de nasc.</label>
      <input type="date" name="birthDate" id="birthDate" />
    </div>
    <div>
      <label htmlFor="drink">Bebe</label>
      <select name="drink" id="drink">
        <option value="true">Sim</option>
        <option value="false">Não</option>
      </select>
    </div>
    <div>
      <label htmlFor="smoke">Fuma</label>
      <select name="smoke" id="smoke">
        <option value="true">Sim</option>
        <option value="false">Não</option>
      </select>
    </div>
    <div>
      <label htmlFor="children">Filhos</label>
      <input type="number" name="children" id="children" />
    </div>
    <div>
      <label htmlFor="sleep">Sono</label>
      <select name="sleep" id="sleep">
        <option value="Bom">Bom</option>
        <option value="Regular">Regular</option>
        <option value="Ruim">Ruim</option>
      </select>
    </div>
    <div>
      <label htmlFor="feeding">Alimentação</label>
      <select name="feeding" id="feeding">
        <option value="Bom">Bom</option>
        <option value="Regular">Regular</option>
        <option value="Ruim">Ruim</option>
      </select>
    </div>
    <div>
      <label htmlFor="drinkWater">Água</label>
      <input type="number" step={.01} name="drinkWater" id="drinkWater" />
    </div>
    <div>
      <label htmlFor="intestine">Intestino</label>
      <select name="intestine" id="intestine">
        <option value="Bom">Bom</option>
        <option value="Regular">Regular</option>
        <option value="Ruim">Ruim</option>
      </select>
    </div>
    <div>
      <label htmlFor="surgeries">Cirurgias</label>
      <input type="text" name="surgeries" id="surgeries" />
    </div>
    <div>
      <label htmlFor="illnesses">Doenças</label>
      <input type="text" name="illnesses" id="illnesses" />
    </div>
    <div>
      <label htmlFor="medicines">Remédios</label>
      <input type="text" name="medicines" id="medicines" />
    </div>
    <div>
      <label htmlFor="illnessesInFamily">Doenças na família</label>
      <input type="text" name="illnessesInFamily" id="illnessesInFamily" />
    </div>
    <div>
      <label htmlFor="mentalHealth">Saúde mental</label>
      <input type="text" name="mentalHealth" id="mentalHealth" />
    </div>
    <div>
      <label htmlFor="otherTreatments">Outros tratamentos</label>
      <input type="text" name="otherTreatments" id="otherTreatments" />
    </div>
    <div>
      <label htmlFor="indication">Indicação</label>
      <input type="text" name="indication" id="indication" />
    </div>
    <div>
      <label htmlFor="startingWeight">Peso Inicial</label>
      <input type="number" step={.01} name="startingWeight" id="startingWeight" />
    </div>
    <div>
      <label htmlFor="rightArm">Braço dir.</label>
      <input type="number" step={.01} name="rightArm" id="rightArm" />
    </div>
    <div>
      <label htmlFor="leftArm">Braço esq.</label>
      <input type="number" step={.01} name="leftArm" id="leftArm" />
    </div>
    <div>
      <label htmlFor="chest">Peito</label>
      <input type="number" step={.01} name="chest" id="chest" />
    </div>
    <div>
      <label htmlFor="waist">Cintura</label>
      <input type="number" step={.01} name="waist" id="waist" />
    </div>
    <div>
      <label htmlFor="hips">Ancas</label>
      <input type="number" step={.01} name="hips" id="hips" />
    </div>
    <div>
      <label htmlFor="butt">Bumbum</label>
      <input type="number" step={.01} name="butt" id="butt" />
    </div>
    <div>
      <label htmlFor="rightThigh">Coxa dir.</label>
      <input type="number" step={.01} name="rightThigh" id="rightThigh" />
    </div>
    <div>
      <label htmlFor="leftThigh">Coxa esq.</label>
      <input type="number" step={.01} name="leftThigh" id="leftThigh" />
    </div>
    <div>
      <label htmlFor="rightCalf">Batata dir.</label>
      <input type="number" step={.01} name="rightCalf" id="rightCalf" />
    </div>
    <div>
      <label htmlFor="leftCalf">Batata esq.</label>
      <input type="number" step={.01} name="leftCalf" id="leftCalf" />
    </div>
    <div>
      <label htmlFor="height">Altura</label>
      <input type="number" step={.01} name="height" id="height" />
    </div>
    <div>
      <label htmlFor="description">Descrição</label>
      <textarea name="description" id="description" cols={30} rows={10}></textarea>
    </div>
    <button type="submit">Cadastrar</button>
  </form>
);

